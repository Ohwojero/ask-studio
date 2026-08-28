"use client";

import { CalendarCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const services = [
  "Wedding Photography",
  "Wedding Videography",
  "Traditional Wedding",
  "Pre-Wedding Session",
  "Portrait Photography",
  "Maternity Photography",
  "Newborn Photography",
  "Corporate Headshots",
  "Commercial Video Production",
  "Event Coverage",
  "Other",
];

export function BookingForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form.entries());

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error ?? "Unable to submit booking. Please try again.");
      return;
    }

    router.push("/thank-you");
  }

  return (
    <form className="booking-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          Full Name
          <input name="fullName" required minLength={2} placeholder="Full Name" />
        </label>
        <label>
          Email Address
          <input name="email" type="email" required placeholder="Email Address" />
        </label>
        <label>
          Phone Number
          <input name="phone" required placeholder="Phone Number" />
        </label>
        <label>
          Service
          <select name="service" required defaultValue="">
            <option value="" disabled>Select a Service</option>
            {services.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label>
          Preferred Date
          <input name="preferredDate" type="date" required />
        </label>
        <label>
          Preferred Time
          <input name="preferredTime" type="time" />
        </label>
      </div>
      <label>
        Tell us about your event or session
        <textarea name="message" required minLength={10} rows={6} placeholder="Tell us about your event or session..." />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button className="button" type="submit" disabled={loading}>
        {loading ? <Loader2 className="spin" size={18} /> : <CalendarCheck size={18} />}
        Schedule My Session
      </button>
    </form>
  );
}
