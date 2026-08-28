"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { portfolioCategories, portfolioImages, PortfolioCategory } from "@/data/portfolio";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type Filter = "all" | PortfolioCategory;

type LivePortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  is_published: boolean;
  sort_order: number | null;
};

const categoryLabelMap: Record<string, string> = {
  portraits: "Portraits",
  weddings: "Weddings",
  baby: "Pregnancy Shoot & Kids",
  commercial: "Commercial",
};

const normalizeCategory = (category: string): Filter => {
  const value = category.toLowerCase();
  if (value.includes("portrait")) return "portraits";
  if (value.includes("wedding")) return "weddings";
  if (value.includes("baby") || value.includes("pregnancy") || value.includes("kid")) return "baby";
  return "all";
};

type LightboxImage = { src: string; alt: string; allImages: string[]; index: number };

export function PortfolioGallery() {
  const [active, setActive] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const [animating, setAnimating] = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const [liveItems, setLiveItems] = useState<LivePortfolioItem[]>([]);

  useEffect(() => {
    let active = true;

    async function loadLiveItems() {
      try {
        const client = getSupabaseBrowserClient();
        const { data, error } = await client
          .from("portfolio_items")
          .select("*")
          .eq("is_published", true)
          .order("sort_order", { ascending: true, nullsFirst: false })
          .order("created_at", { ascending: false });

        if (!active || error) return;
        setLiveItems(data ?? []);
      } catch (error) {
        if (active) {
          setLiveItems([]);
        }
      }
    }

    loadLiveItems();
    return () => {
      active = false;
    };
  }, []);

  const liveImages = liveItems
    .filter((item) => item.image_url)
    .map((item) => ({
      src: item.image_url,
      category: categoryLabelMap[item.category] ?? item.title,
      key: normalizeCategory(item.category),
    }));

  const filterCounts = {
    all: Object.values(portfolioImages).flat().length + liveImages.length,
    portraits: portfolioImages.portraits.length + liveImages.filter((item) => item.key === "portraits").length,
    weddings: portfolioImages.weddings.length + liveImages.filter((item) => item.key === "weddings").length,
    baby: portfolioImages.baby.length + liveImages.filter((item) => item.key === "baby").length,
  };

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All Work", count: filterCounts.all },
    { key: "portraits", label: "Portraits", count: filterCounts.portraits },
    { key: "weddings", label: "Weddings", count: filterCounts.weddings },
    { key: "baby", label: "Pregnancy Shoot & Kids", count: filterCounts.baby },
  ];

  const allImages = active === "all"
    ? [
        ...portfolioCategories.flatMap((c) => portfolioImages[c.key].map((src) => ({ src, category: c.label, key: c.key }))),
        ...liveImages,
      ]
    : [
        ...portfolioImages[active].map((src) => ({ src, category: filters.find((f) => f.key === active)?.label ?? "", key: active })),
        ...liveImages.filter((item) => item.key === active),
      ];

  const handleFilter = (key: Filter) => {
    if (key === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(key);
      setGridKey((k) => k + 1);
      setAnimating(false);
    }, 280);
  };

  const openLightbox = (src: string, index: number) => {
    setLightbox({ src, alt: allImages[index].category, allImages: allImages.map(i => i.src), index });
  };

  const closeLightbox = () => setLightbox(null);

  const lightboxNav = (dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.index + dir + lightbox.allImages.length) % lightbox.allImages.length;
    setLightbox({ ...lightbox, src: lightbox.allImages[next], index: next });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lightboxNav(1);
      if (e.key === "ArrowLeft") lightboxNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      {/* ── Parallax Hero ── */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-overlay" />
        <div className="portfolio-hero-content">
          <p className="eyebrow">Our Portfolio</p>
          <h1>Every Frame,<br />A Timeless Story.</h1>
          <p>Discover our favourite moments captured through creativity, passion and visual storytelling.</p>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <div className="portfolio-filters">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`portfolio-filter-btn${active === f.key ? " active" : ""}`}
            onClick={() => handleFilter(f.key)}
            type="button"
          >
            {f.label}
            <span className="filter-count">{f.count}</span>
          </button>
        ))}
      </div>

      {/* ── Masonry Grid ── */}
      <section className="portfolio-section">
        <div key={gridKey} className={`portfolio-masonry${animating ? " grid-fade-out" : " grid-fade-in"}`}>
          {allImages.map(({ src, category }, i) => (
            <div
              key={src + i}
              className={`portfolio-item portfolio-item-${(i % 5) + 1}`}
              onClick={() => openLightbox(src, i)}
            >
              <Image src={src} alt={`${category} ${i + 1}`} fill sizes="(max-width: 900px) 50vw, 33vw" style={{ objectFit: "cover" }} />
              <div className="portfolio-item-overlay">
                <ZoomIn size={28} color="white" />
                <span>{category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}><X size={24} /></button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); lightboxNav(-1); }}><ChevronLeft size={28} /></button>
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox.src} alt={lightbox.alt} fill sizes="90vw" style={{ objectFit: "contain" }} />
          </div>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); lightboxNav(1); }}><ChevronRight size={28} /></button>
          <p className="lightbox-counter">{lightbox.index + 1} / {lightbox.allImages.length}</p>
        </div>
      )}

      {/* ── CTA ── */}
      <section className="section cta-row">
        <h2>Love What You See?</h2>
        <Link href="/contact" className="button">Book Your Session</Link>
      </section>
    </>
  );
}
