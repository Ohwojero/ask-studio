"use client";

import Image from "next/image";
import { useRef, MouseEvent } from "react";

type TiltCardProps = {
  src: string;
  alt: string;
  label: string;
};

export function TiltCard({ src, alt, label }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateX = (y - 0.5) * -22;
    const rotateY = (x - 0.5) * 22;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.22) 0%, transparent 70%)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    glare.style.background = "transparent";
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Image src={src} alt={alt} width={560} height={720} className="tilt-card-img" />
      <div ref={glareRef} className="tilt-glare" />
      <div className="tilt-label">{label}</div>
    </div>
  );
}
