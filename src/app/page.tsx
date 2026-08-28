"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { portfolioImages } from "@/data/portfolio";

const featuredStories = [
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

const marqueeStories = [...featuredStories, ...featuredStories];

export default function HomePage() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const scrollMarquee = (direction: "left" | "right") => {
    const track = marqueeRef.current;
    if (!track) return;

    const amount = track.clientWidth * 0.35;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="eyebrow">ASK Studios Limited</p>
          <h1>Creating Timeless Stories.</h1>
          <p>
            Photography, Videography <br /> Creative Media Solutions <br />
            for individuals and brands.
          </p>
          <Link href="/contact" className="button">
            Book a Session
          </Link>
        </div>
      </section>

      <section className="home-gallery-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured moments</p>
            <h2>Stories we love to tell.</h2>
          </div>
          <Link href="/portfolio" className="text-link">
            Open portfolio <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-featured-marquee" aria-label="Featured story cards">
          <div className="marquee-controls">
            <button type="button" className="marquee-arrow" onClick={() => scrollMarquee("left")} aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button type="button" className="marquee-arrow" onClick={() => scrollMarquee("right")} aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="home-featured-track" ref={marqueeRef}>
            {marqueeStories.map((story, index) => (
              <article key={`${story.label}-${index}`} className="home-feature-card">
                <div className="home-feature-image">
                  <Image
                    src={story.image}
                    alt={story.label}
                    fill
                    sizes="(max-width: 900px) 82vw, 420px"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="home-feature-copy">
                  <span>{story.label}</span>
                  <p>{story.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
