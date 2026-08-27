export type PortfolioCategory = "portraits" | "weddings" | "baby";

export const portfolioCategories: { key: PortfolioCategory; label: string; description: string }[] = [
  { key: "portraits", label: "Portrait Photography", description: "Studio, lifestyle, personal brand, and editorial portraits." },
  { key: "weddings", label: "Wedding Stories", description: "Traditional weddings, white weddings, and couple stories." },
  { key: "baby", label: "Maternity & Baby", description: "Pregnancy, newborn, baby, and family sessions." },
];

export const portfolioImages: Record<PortfolioCategory, string[]> = {
  portraits: [
    "/images/portraits/portraits1.JPEG",
    "/images/portraits/portraits2.jpg",
    "/images/portraits/portraits3.jpeg",
    "/images/portraits/portraits4.jpg",
    "/images/portraits/portraits5.jpeg",
    "/images/portraits/portraits6.jpeg",
    "/images/portraits/portraits7.jpeg",
    "/images/portraits/portraits8.jpeg",
    "/images/portraits/portraits9.jpeg",
    "/images/portraits/portraits10.jpeg",
    "/images/portraits/portraits11.jpeg",
    "/images/portraits/portraits12.jpeg",
  ],
  weddings: [
    "/images/weddings/wedding1.jpeg",
    "/images/weddings/wedding2.jpeg",
    "/images/weddings/wedding3.jpeg",
    "/images/weddings/wedding4.jpeg",
    "/images/weddings/wedding5.jpeg",
    "/images/weddings/wedding6.jpeg",
    "/images/weddings/wedding7.jpeg",
    "/images/weddings/wedding8.jpeg",
    "/images/weddings/wedding9.jpeg",
    "/images/weddings/wedding10.jpeg",
    "/images/weddings/wedding11.jpeg",
    "/images/weddings/wedding12.jpeg",
  ],
  baby: [
    "/images/baby/baby1.jpg",
    "/images/baby/baby2.jpeg",
    "/images/baby/baby3.PNG",
    "/images/baby/baby4.PNG",
    "/images/baby/baby5.jpeg",
    "/images/baby/baby6.jpeg",
    "/images/baby/baby7.jpeg",
    "/images/baby/baby8.jpeg",
    "/images/baby/baby9.jpeg",
    "/images/baby/baby10.jpg",
    "/images/baby/baby11.jpeg",
    "/images/baby/baby12.jpeg",
  ],
};
