"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, MouseEvent } from "react";
import { useFadeIn } from "@/components/sections/useFadeIn";
import { processSteps, serviceGroups, whyUs } from "@/data/services";

function ServiceCard({ service, accent }: { service: (typeof serviceGroups)[0]["items"][0]; accent: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    card.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) scale3d(1.02,1.02,1.02)`;
    glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.14) 0%, transparent 65%)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    glare.style.background = "transparent";
  };

  return (
    <div
      ref={cardRef}
      className={`svc-card${accent ? " svc-card-accent" : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="svc-card-media">
        {"video" in service && service.video ? (
          service.video.includes("drive.google.com") ? (
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '8px', overflow: 'hidden' }}>
              <iframe
                src={service.video}
                title={`${service.title} video`}
                loading="lazy"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
              <a
                href={service.video}
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  position: 'absolute',
                  right: 12,
                  bottom: 12,
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  padding: '6px 10px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontSize: 13,
                }}
              >
                Open video
              </a>
            </div>
          ) : (
            <video autoPlay muted loop playsInline>
              <source src={service.video} type="video/mp4" />
            </video>
          )
        ) : (
          <Image src={service.image} alt={service.title} width={600} height={500} />
        )}
        <div className="svc-card-media-overlay" />
      </div>
      <div ref={glareRef} className="tilt-glare" />
      <div className="svc-card-body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <Link href="/contact" className="svc-cta">Book Now →</Link>
      </div>
    </div>
  );
}

export function ServicesContent() {
  const fade0        = useFadeIn();
  const fade1        = useFadeIn();
  const fade2        = useFadeIn();
  const groupFades   = [fade0, fade1, fade2];
  const processFade  = useFadeIn();
  const whyFade      = useFadeIn();

  return (
    <>
      {/* ── Parallax Hero ── */}
      <section className="svc-hero">
        <div className="svc-hero-overlay" />
        <div className="svc-hero-content">
          <p className="eyebrow">What We Offer</p>
          <h1>Premium Creative<br />Media Services.</h1>
          <p>Photography, videography and creative media solutions tailored to preserve your most meaningful moments.</p>
          <div className="svc-hero-btns">
            <Link href="/contact" className="button">Book a Session</Link>
            <Link href="/portfolio" className="button button-outline">View Portfolio</Link>
          </div>
        </div>
      </section>

      {/* ── Service Groups ── */}
      {serviceGroups.map((group, gi) => {
        const fade = groupFades[gi];
        return (
          <div key={group.title} ref={fade.ref} className={`fade-section ${fade.visible ? "fade-in-up" : ""}`}>
            <section className={`svc-group${gi % 2 !== 0 ? " svc-group-dark" : ""}`}>
              <div className="section">
                <div className="svc-group-heading">
                  <div>
                    <p className="eyebrow">{`0${gi + 1}`}</p>
                    <h2>{group.title}</h2>
                    <p className="svc-group-intro">{group.intro}</p>
                  </div>
                  <Link href="/contact" className="button">Book This Service</Link>
                </div>
                <div className={`svc-grid svc-grid-${group.items.length}`}>
                  {group.items.map((item, i) => (
                    <ServiceCard key={item.title} service={item} accent={i % 2 !== 0} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      })}

      {/* ── Process ── */}
      <div ref={processFade.ref} className={`fade-section ${processFade.visible ? "fade-in-up" : ""}`}>
        <section className="svc-process">
          <div className="section">
            <div className="section-heading-center">
              <p className="eyebrow">How it works</p>
              <h2>Our Process</h2>
            </div>
            <div className="svc-process-grid">
              {processSteps.map(([number, title, text], i) => (
                <div key={number as string} className={`svc-step${i % 2 !== 0 ? " svc-step-accent" : ""}`}>
                  <span className="svc-step-num">{number as string}</span>
                  <h3>{title as string}</h3>
                  <p>{text as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── Why Us Parallax ── */}
      <div ref={whyFade.ref} className={`fade-section ${whyFade.visible ? "fade-in-up" : ""}`}>
        <section className="svc-why-parallax">
          <div className="parallax-overlay" />
          <div className="section" style={{ position: "relative", zIndex: 1 }}>
            <div className="section-heading-center">
              <p className="eyebrow" style={{ color: "var(--gold)" }}>Why us</p>
              <h2 style={{ color: "white" }}>Why Clients Choose ASK Studios</h2>
            </div>
            <div className="why-grid">
              {whyUs.map((item, i) => (
                <div className={`why-box${i % 2 !== 0 ? " why-box-accent" : ""}`} key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── CTA ── */}
      <section className="section cta-row">
        <h2>Ready to Tell Your Story?</h2>
        <Link href="/contact" className="button">Book a Session</Link>
      </section>
    </>
  );
}
