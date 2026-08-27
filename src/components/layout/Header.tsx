"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { navItems, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = { current: 0 };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass = [
    "site-header",
    scrolled ? "header-scrolled" : "",
  ].filter(Boolean).join(" ");

  return (
    <header className={headerClass}>
      <Link href="/" className="brand" aria-label={`${site.shortName} home`}>
        <Image src="/images/IMG_8800.PNG" alt={site.shortName} width={96} height={64} priority style={{ width: 96, height: "auto" }} />
      </Link>

      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={open ? "site-nav open" : "site-nav"}>
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : ""} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          );
        })}
        <Link href="/dashboard" className={pathname.startsWith("/dashboard") ? "active nav-admin" : "nav-admin"} onClick={() => setOpen(false)}>
          Dashboard
        </Link>
      </nav>
    </header>
  );
}
