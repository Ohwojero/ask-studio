"use client";

import { Eye, EyeOff, ImagePlus, Loader2, Lock, Pencil, RefreshCcw, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const uploadFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

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
    setToast(null);
    await loadDashboard(password);
  }

  async function refreshDashboard() {
    await loadDashboard(password);
  }

  function populateEditForm(item: PortfolioItem) {
    const form = uploadFormRef.current;
    if (!form) return;

    const titleInput = form.elements.namedItem("title") as HTMLInputElement | null;
    const categoryInput = form.elements.namedItem("category") as HTMLSelectElement | null;
    const descriptionInput = form.elements.namedItem("description") as HTMLTextAreaElement | null;
    const sortOrderInput = form.elements.namedItem("sortOrder") as HTMLInputElement | null;
    const publishedInput = form.elements.namedItem("isPublished") as HTMLInputElement | null;
    const imageInput = form.elements.namedItem("image") as HTMLInputElement | null;

    if (titleInput) titleInput.value = item.title;
    if (categoryInput) categoryInput.value = item.category;
    if (descriptionInput) descriptionInput.value = item.description ?? "";
    if (sortOrderInput) sortOrderInput.value = "0";
    if (publishedInput) publishedInput.checked = item.is_published;
    if (imageInput) imageInput.value = "";

    setEditingItemId(item.id);
    setMessage("Editing selected item. Update your changes and save.");
    setToast(null);
  }

  async function handleDeleteItem(item: PortfolioItem) {
    const confirmed = window.confirm(`Delete "${item.title}" from the portfolio?`);
    if (!confirmed) return;

    setLoading(true);
    setMessage("");
    setToast(null);

    const response = await fetch(`/api/admin/portfolio?id=${encodeURIComponent(item.id)}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });

    setLoading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setMessage(payload?.error ?? "Delete failed.");
      return;
    }

    if (editingItemId === item.id) {
      setEditingItemId(null);
      const form = uploadFormRef.current;
      if (form) form.reset();
    }

    setMessage("Portfolio item deleted.");
    setToast("SUCCESS: Portfolio item deleted successfully.");
    await loadDashboard(password);
  }

  async function uploadPortfolio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setToast(null);

    const form = new FormData(event.currentTarget);
    const isEditing = Boolean(editingItemId);

    if (isEditing && editingItemId) {
      form.set("id", editingItemId);
    }

    const existingImageUrl = (isEditing && items.find((item) => item.id === editingItemId)?.image_url) ?? "";
    if (isEditing) {
      form.set("existingImageUrl", existingImageUrl);
    }

    const response = await fetch("/api/admin/portfolio", {
      method: isEditing ? "PUT" : "POST",
      headers: { "x-admin-password": password },
      body: form,
    });

    setLoading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setMessage(payload?.error ?? (isEditing ? "Update failed." : "Upload failed."));
      return;
    }

    const targetForm = event.currentTarget ?? uploadFormRef.current;
    if (targetForm) {
      targetForm.reset();
    }
    setEditingItemId(null);

    if (isEditing) {
      setMessage("Portfolio item updated.");
      setToast("SUCCESS: Portfolio item updated successfully.");
    } else {
      setMessage("Portfolio item uploaded.");
      setToast("SUCCESS: Portfolio item uploaded successfully.");
    }

    await loadDashboard(password);
  }

  if (!authorized) {
    return (
      <section className="section dashboard-login">
        <form onSubmit={login}>
          <Lock size={24} />
          <h1>Welcome back, SUCCESS</h1>

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Admin password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

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
        <button className="button secondary" type="button" onClick={() => void refreshDashboard()} disabled={loading}>
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      {toast ? <div className="dashboard-toast">{toast}</div> : null}
      {message ? <p className="dashboard-message">{message}</p> : null}

      <div className="dashboard-grid">
        <form ref={uploadFormRef} className="admin-panel" onSubmit={uploadPortfolio}>
          <ImagePlus size={22} />
          <h2>{editingItemId ? "Edit Portfolio Item" : "Upload Portfolio Item"}</h2>
          <label>Title<input name="title" required placeholder="Wedding story" /></label>
          <label>
            Category
            <select name="category" required defaultValue="weddings">
              <option value="weddings">Weddings</option>
              <option value="portraits">Portraits</option>
              <option value="baby">Pregnancy Shoot & Kids</option>
              <option value="commercial">Commercial</option>
            </select>
          </label>
          <label>Description<textarea name="description" rows={4} placeholder="Short description" /></label>
          <label>Sort order<input name="sortOrder" type="number" defaultValue="0" /></label>
          <label className="checkbox-row"><input name="isPublished" type="checkbox" defaultChecked /> Published</label>
          <label>Image<input name="image" type="file" accept="image/*" required={!editingItemId} /></label>
          <button className="button" type="submit" disabled={loading}>{editingItemId ? "Save changes" : "Upload image"}</button>
          {editingItemId ? (
            <button type="button" className="button secondary" onClick={() => {
              setEditingItemId(null);
              uploadFormRef.current?.reset();
            }}>
              Cancel edit
            </button>
          ) : null}
        </form>

        <div className="admin-panel">
          <h2>Uploaded Content</h2>
          <div className="content-list">
            {items.length ? items.map((item) => (
              <article key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <div className="content-item-body">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.category} - {item.is_published ? "Published" : "Draft"}</p>
                  </div>
                  <div className="content-actions">
                    <button type="button" className="mini-button" onClick={() => populateEditForm(item)}>
                      <Pencil size={14} /> Edit
                    </button>
                    <button type="button" className="mini-button danger" onClick={() => handleDeleteItem(item)}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
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
