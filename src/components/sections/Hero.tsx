"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type HeroSlide = {
  image: string;
  caption: string;
  label:string;
};

type HeroProps = {
  title: string;
  eyebrow?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  slides: HeroSlide[];
};

export function Hero({ title, eyebrow, description, ctaLabel, ctaHref, slides = [] }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = slides.length;

  const phrases = [
    "Creating Timeless Stories.",
    "Capturing Real Emotions.",
    "Preserving Precious Moments.",
    "Crafting Visual Legacies.",
    "Telling Stories Through Light.",
    "Freezing Time, Forever.",
    "Where Memories Come Alive.",
    "Every Frame, A Feeling.",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && typed.length < phrase.length) {
      timeout = setTimeout(() => setTyped(phrase.slice(0, typed.length + 1)), 65);
    } else if (!deleting && typed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(phrase.slice(0, typed.length - 1)), 35);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [typed, deleting, phraseIndex]);

  const go = useCallback(
    (next: number) => {
      if (animating || total === 0) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((next + total) % total);
        setAnimating(false);
      }, 320);
    },
    [animating, total]
  );

  useEffect(() => {
    if (total === 0) return;
    const t = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(t);
  }, [current, go, total]);

  if (total === 0) return null;
  const slide = slides[current];

  return (
    <section className="hero-split">
      {/* Left — text */}
      <div className="hero-text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{typed}<span className="type-cursor blinking">|</span></h1>
        <p>{description}</p>
        {ctaLabel && ctaHref && (
          <Link className="button" href={ctaHref}>{ctaLabel}</Link>
        )}
      </div>

      {/* Right — carousel */}
      <div className="hero-carousel">
        <div className={`hero-carousel-img ${animating ? "fade-out" : "fade-in"}`}>
          <Image
            src={slide.image}
            alt={slide.caption}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Frosted glass caption */}
        <div className="carousel-caption">
          <span className="carousel-label">{slide.label}</span>
          <p>{slide.caption}</p>
        </div>

        {/* Controls */}
        <button className="carousel-btn carousel-prev" onClick={() => go(current - 1)} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button className="carousel-btn carousel-next" onClick={() => go(current + 1)} aria-label="Next">
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === current ? " active" : ""}`}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
