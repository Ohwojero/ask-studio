"use client";

import { ImagePlus, Loader2, Lock, RefreshCcw } from "lucide-react";
import { FormEvent, useState } from "react";

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string | null;
  message: string;
  status: string;
  created_at: string;
};

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  is_published: boolean;
};

export default function DashboardPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadDashboard(adminPassword = password) {
    setLoading(true);
    setMessage("");

    const headers = { "x-admin-password": adminPassword };
    const [bookingResponse, portfolioResponse] = await Promise.all([
      fetch("/api/admin/bookings", { headers }),
      fetch("/api/admin/portfolio", { headers }),
    ]);

    setLoading(false);

    if (!bookingResponse.ok || !portfolioResponse.ok) {
      setAuthorized(false);
      setMessage("Could not load dashboard. Check ADMIN_PASSWORD and Supabase env values.");
      return;
    }

    const bookingPayload = await bookingResponse.json();
    const portfolioPayload = await portfolioResponse.json();
    setBookings(bookingPayload.bookings ?? []);
    setItems(portfolioPayload.items ?? []);
    setAuthorized(true);
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadDashboard(password);
  }

  async function uploadPortfolio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/portfolio", {
      method: "POST",
      headers: { "x-admin-password": password },
      body: form,
    });

    setLoading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setMessage(payload?.error ?? "Upload failed.");
      return;
    }

    event.currentTarget.reset();
    setMessage("Portfolio item uploaded.");
    await loadDashboard(password);
  }

  if (!authorized) {
    return (
      <section className="section dashboard-login">
        <form onSubmit={login}>
          <Lock size={24} />
          <h1>Admin Dashboard</h1>
          <p>Enter the dashboard password from your `.env.local` file.</p>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Admin password" required />
          {message ? <p className="form-error">{message}</p> : null}
          <button className="button" type="submit" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : null}
            Open dashboard
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="section dashboard">
      <div className="dashboard-top">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Content Dashboard</h1>
          <p>Upload portfolio images and review booking requests.</p>
        </div>
        <button className="button secondary" type="button" onClick={() => loadDashboard()} disabled={loading}>
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      {message ? <p className="dashboard-message">{message}</p> : null}

      <div className="dashboard-grid">
        <form className="admin-panel" onSubmit={uploadPortfolio}>
          <ImagePlus size={22} />
          <h2>Upload Portfolio Item</h2>
          <label>Title<input name="title" required placeholder="Wedding story" /></label>
          <label>
            Category
            <select name="category" required defaultValue="weddings">
              <option value="weddings">Weddings</option>
              <option value="portraits">Portraits</option>
              <option value="baby">Maternity & Baby</option>
              <option value="commercial">Commercial</option>
            </select>
          </label>
          <label>Description<textarea name="description" rows={4} placeholder="Short description" /></label>
          <label>Sort order<input name="sortOrder" type="number" defaultValue="0" /></label>
          <label className="checkbox-row"><input name="isPublished" type="checkbox" defaultChecked /> Published</label>
          <label>Image<input name="image" type="file" accept="image/*" required /></label>
          <button className="button" type="submit" disabled={loading}>Upload image</button>
        </form>

        <div className="admin-panel">
          <h2>Uploaded Content</h2>
          <div className="content-list">
            {items.length ? items.map((item) => (
              <article key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.category} - {item.is_published ? "Published" : "Draft"}</p>
                </div>
              </article>
            )) : <p>No uploaded content yet.</p>}
          </div>
        </div>
      </div>

      <div className="admin-panel bookings-panel">
        <h2>Booking Requests</h2>
        <div className="bookings-table">
          {bookings.length ? bookings.map((booking) => (
            <article key={booking.id}>
              <div>
                <h3>{booking.full_name}</h3>
                <p>{booking.service}</p>
              </div>
              <div>
                <p>{booking.email}</p>
                <p>{booking.phone}</p>
              </div>
              <div>
                <p>{booking.preferred_date}</p>
                <p>{booking.preferred_time ?? "Any time"}</p>
              </div>
              <p>{booking.message}</p>
            </article>
          )) : <p>No booking requests yet.</p>}
        </div>
      </div>
    </section>
  );
}
