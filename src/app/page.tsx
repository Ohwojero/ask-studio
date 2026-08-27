import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { portfolioImages } from "@/data/portfolio";
import { Hero, HeroSlide } from "@/components/sections/Hero";
import { TiltCard } from "@/components/sections/TiltCard";

const heroSlides: HeroSlide[] = [
  {
    image: portfolioImages.weddings[0],
    label: "Wedding Stories",
    caption: "Capturing every vow, every tear, every dance — your wedding day told beautifully.",
  },
  {
    image: portfolioImages.portraits[0],
    label: "Portrait Sessions",
    caption: "Studio and lifestyle portraits that reveal the real you — confident, authentic, timeless.",
  },
  {
    image: portfolioImages.baby[0],
    label: "Maternity & Baby",
    caption: "Precious milestones frozen in time — from bump to baby, every moment matters.",
  },
  {
    image: portfolioImages.weddings[4],
    label: "Wedding Stories",
    caption: "Traditional ceremonies, white weddings, and couple stories crafted with care.",
  },
  {
    image: portfolioImages.portraits[2],
    label: "Portrait Sessions",
    caption: "Personal brand and editorial portraits that make a lasting first impression.",
  },
];

export default function HomePage() {
  const featured = [
    { image: portfolioImages.weddings[0],   label: "Wedding Stories" },
    { image: portfolioImages.portraits[1],  label: "Portrait Sessions" },
    { image: portfolioImages.baby[0],       label: "Maternity & Baby" },
    { image: portfolioImages.weddings[7],   label: "Wedding Stories" },
  ];

  return (
    <>
      <Hero
        title="Creating Timeless Stories."
        description="Photography, Videography & Creative Media Solutions for individuals and brands."
        ctaLabel="Book a Session"
        ctaHref="/contact"
        slides={heroSlides}
      />

      <section className="parallax-who">
        <div className="parallax-overlay" />
        <div className="parallax-content">
          <p className="eyebrow">Who we are</p>
          <h2>ASK Studios Limited</h2>
          <p>
            ASK Studios Limited is a creative media company dedicated to preserving life&apos;s most meaningful moments through exceptional photography, videography, drone coverage, portrait sessions, event coverage, and creative visual storytelling.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Portfolio</p>
          <h2>Recent visual stories.</h2>
          <Link href="/portfolio" className="text-link">Open portfolio <ArrowRight size={16} /></Link>
        </div>
        <div className="portfolio-preview">
          {featured.map((item) => (
            <TiltCard key={item.image} src={item.image} alt="ASK Studios portfolio work" label={item.label} />
          ))}
        </div>
      </section>

      <section className="section dark-band">
        <div>
          <h2>Every session is handled by appointment.</h2>
          <p>That keeps the process personal, focused, and properly planned before production day.</p>
        </div>
        <Link className="button button-light" href="/contact">Book a Session</Link>
      </section>
    </>
  );
}
