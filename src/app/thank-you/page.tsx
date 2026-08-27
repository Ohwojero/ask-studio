import Link from "next/link";

export const metadata = { title: "Thank You" };

export default function ThankYouPage() {
  return (
    <section className="section thank-you">
      <h1>Thank You!</h1>
      <p>Your booking request has been received successfully.</p>
      <p>Our team will review your request and get back to you shortly.</p>
      <Link href="/" className="button">Back to Home</Link>
    </section>
  );
}
