import { Mail, MapPin, Phone, Instagram, Clock } from "lucide-react";
import { BookingForm } from "@/components/forms/BookingForm";
import { site } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      {/* ── Parallax Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <p className="eyebrow">Get In Touch</p>
          <h1>Let&apos;s Create<br />Something Beautiful.</h1>
          <p>Every session at ASK Studios is by appointment — ensuring you receive our full attention and a truly personalized experience.</p>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="contact-info-strip">
        <a href={site.mapUrl} target="_blank" rel="noreferrer" className="contact-info-card">
          <span className="contact-info-icon"><MapPin size={22} /></span>
          <div>
            <h3>Visit Our Studio</h3>
            <p>{site.addressLabel}</p>
          </div>
        </a>
        <a href={site.phoneHref} className="contact-info-card">
          <span className="contact-info-icon"><Phone size={22} /></span>
          <div>
            <h3>Call Us</h3>
            <p>{site.phone}</p>
          </div>
        </a>
        <a href={`mailto:${site.email}`} className="contact-info-card">
          <span className="contact-info-icon"><Mail size={22} /></span>
          <div>
            <h3>Email Us</h3>
            <p>{site.email}</p>
          </div>
        </a>
        <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="contact-info-card">
          <span className="contact-info-icon"><Instagram size={22} /></span>
          <div>
            <h3>Instagram</h3>
            <p>@ask.studios_</p>
          </div>
        </a>
      </section>

      {/* ── Booking Section ── */}
      <section className="contact-booking" id="booking">
        {/* Left panel */}
        <div className="contact-booking-left">
          <p className="eyebrow">Book a Session</p>
          <h2>Request an Appointment</h2>
          <p>Tell us about your session and we&apos;ll contact you to confirm availability and finalize the details.</p>

          <div className="contact-steps">
            <div className="contact-step">
              <span>01</span>
              <div>
                <h4>Fill the Form</h4>
                <p>Share your details and session preferences.</p>
              </div>
            </div>
            <div className="contact-step">
              <span>02</span>
              <div>
                <h4>We Reach Out</h4>
                <p>Our team contacts you to confirm availability.</p>
              </div>
            </div>
            <div className="contact-step">
              <span>03</span>
              <div>
                <h4>Session Day</h4>
                <p>We show up fully prepared to create magic.</p>
              </div>
            </div>
          </div>

          <p className="contact-note">
            ✦ Appointments are confirmed only after our team contacts you to verify availability.
          </p>
        </div>

        {/* Right panel — form */}
        <div className="contact-booking-right">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
