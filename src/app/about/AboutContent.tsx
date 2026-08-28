"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, MouseEvent, useEffect, useState, ReactNode } from "react";
import { useFadeIn } from "@/components/sections/useFadeIn";

function ScrollOutCard({ children, delay = 0, accent = false }: { children: ReactNode; delay?: number; accent?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`value-card${accent ? " value-card-accent" : ""}${visible ? "" : " scroll-out"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </article>
  );
}


const coreValues = [
  { title: "Creativity", icon: "✦", text: "We approach every project with originality, imagination, and artistic excellence." },
  { title: "Excellence", icon: "◈", text: "We strive for the highest quality in every photograph, film, and creative production." },
  { title: "Integrity", icon: "◇", text: "We build lasting relationships through honesty, professionalism, and transparency." },
  { title: "Innovation", icon: "⬡", text: "We embrace new ideas, modern technology, and continuous improvement in everything we create." },
];

const whyUs = [
  "Professional Photography",
  "Cinematic Videography",
  "Drone Coverage",
  "Portrait Sessions",
  "Event Coverage",
  "Professional Editing",
  "Fast Delivery",
  "Exceptional Client Experience",
];

function Portrait3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    card.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -18}deg) rotateY(${(x - 0.5) * 18}deg) scale3d(1.03,1.03,1.03)`;
    glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    glare.style.background = "transparent";
  };

  return (
    <div ref={cardRef} className="about-portrait-3d" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <Image src="/images/portraits/portraits8.jpeg" alt="ASK Studios portrait work" width={560} height={720} />
      <div ref={glareRef} className="tilt-glare" />
      <div className="about-portrait-badge">Our Work</div>
    </div>
  );
}

export function AboutContent() {
  const storyFade   = useFadeIn();
  const missionFade = useFadeIn();
  const valuesFade  = useFadeIn();
  const whyFade     = useFadeIn();

  return (
    <>
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="eyebrow">About ASK Studios</p>
          <h1>Where Creativity<br />Meets Excellence.</h1>
          <p>A creative media company dedicated to preserving life&apos;s most meaningful moments.</p>
          <Link href="/contact" className="button">Book a Session</Link>
        </div>
        <div className="about-hero-right">
          <Portrait3D />
        </div>
      </section>

      {/* ── Our Story ── */}
      <div ref={storyFade.ref} className={`fade-section ${storyFade.visible ? "fade-in-up" : ""}`}>
        <section className="section about-story-grid">
          <div className="about-founder-card">
            <Image src="/images/success.jpeg" alt="Success Ifeoma Agboba" width={520} height={640} />
            <div className="about-founder-info">
              <h3>Success Ifeoma Agboba</h3>
              <p>Co-Founder &amp; Lead Photographer</p>
            </div>
          </div>

          <div className="about-story-text">
            <p className="eyebrow">Our Story</p>
            <p>ASK Studios Limited is a creative media company dedicated to preserving life&apos;s most meaningful moments through exceptional photography, videography, drone coverage, portrait sessions, event coverage, and creative visual storytelling.</p>
            <p>Our journey began in 2021 with two independent creative brands — Studio Superior and AgbobaK Multimedia. Over the years, both brands built strong reputations for quality, professionalism, and memorable storytelling.</p>
            <p>In 2026, they joined forces under one unified identity — ASK Studios Limited — bringing together experience, creativity, and passion to serve individuals, families, organizations, and businesses with greater capacity and a shared commitment to excellence.</p>
          </div>

          <div className="about-founder-card">
            <Image src="/images/portraits/kingsley.jpg.jpeg" alt="Kingsley Chukwuka Agboba" width={520} height={640} />
            <div className="about-founder-info">
              <h3>Kingsley Chukwuka Agboba</h3>
              <p>Co-Founder &amp; Creative Director</p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Mission & Vision ── */}
      <div ref={missionFade.ref} className={`fade-section ${missionFade.visible ? "fade-in-up" : ""}`}>
        <section className="section mission-vision">
          <article className="mission-card">
            <span className="mv-icon">◎</span>
            <h2>Our Mission</h2>
            <p>To capture life&apos;s most meaningful moments and transform them into timeless visual stories through exceptional photography, videography, drone coverage, and creative media solutions delivered with creativity, professionalism, and genuine care.</p>
          </article>
          <article className="vision-card">
            <span className="mv-icon">◉</span>
            <h2>Our Vision</h2>
            <p>To become one of Africa&apos;s leading creative media companies, recognized for innovative storytelling, world-class visual production, and unforgettable client experiences that set the standard for excellence.</p>
          </article>
        </section>
      </div>

      {/* ── Core Values ── */}
      <div ref={valuesFade.ref} className={`fade-section ${valuesFade.visible ? "fade-in-up" : ""}`}>
        <section className="section">
          <div className="section-heading-center">
            <p className="eyebrow">What drives us</p>
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            {coreValues.map((v, i) => (
              <ScrollOutCard key={v.title} delay={i * 120} accent={i % 2 !== 0}>
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </ScrollOutCard>
            ))}
          </div>
        </section>
      </div>

      {/* ── Why Choose Us ── */}
      <div ref={whyFade.ref} className={`fade-section ${whyFade.visible ? "fade-in-up" : ""}`}>
        <section className="about-why-parallax">
          <div className="parallax-overlay" />
          <div className="about-why-inner">
            <div className="section-heading-center">
              <p className="eyebrow">Reasons to work with us</p>
              <h2>Why Choose ASK Studios?</h2>
            </div>
            <div className="why-grid">
              {whyUs.map((item, i) => (
                <div className={`why-box${i % 2 !== 0 ? " why-box-accent" : ""}`} key={item}>
                  <span className="why-check">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── CTA ── */}
      <section className="section cta-row">
        <h2>Ready to create timeless memories?</h2>
        <Link href="/contact" className="button">Book a Session</Link>
      </section>
    </>
  );
}
