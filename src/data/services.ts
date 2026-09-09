import { Camera, Clapperboard, Heart, Sparkles, Users, Video } from "lucide-react";

export const serviceGroups = [
  {
    title: "Portrait Photography",
    intro: "Timeless studio portraits for individuals, professionals, creatives and personal branding.",
    items: [
      {
        title: "Studio Portraits",
        description: "Timeless studio portraits for individuals, professionals, creatives and personal branding.",
        image: "/images/portraits/portraits1.JPEG",
        icon: Camera,
      },
      {
        title: "Pregnancy Shoot & Kids",
        description: "Celebrate the beauty of motherhood and the joy of growing families with elegant maternity portraits and playful child moments that capture life’s sweetest milestones.",
        image: "/images/baby/baby2.jpeg",
        icon: Heart,
      },

      {
        title: "Weddings",
        description: "Timeless wedding photography that beautifully captures your love, emotions, and unforgettable moments.",
        image: "/images/weddings/wedding3.jpeg",
        icon: Users,
      },
    ],
  },
  {
    title: "Videography",
    intro: "Cinematic wedding films and professional commercial video production for brands and businesses.",
    items: [
      {
        title: "Wedding Films",
        description: "Cinematic wedding films that preserve every emotion.",
        image: "/images/weddings/wedding4.jpeg",
        icon: Clapperboard,
        video: "https://drive.google.com/file/d/1JH1xY9eeky1EN58p2qAntDx8JsrqEXdt/preview",
      },
      {
        title: "Commercial Video Production",
        description: "Professional promotional videos for brands and businesses.",
        image: "/images/services-hero.jpeg",
        icon: Video,
        video: "https://drive.google.com/file/d/1C8kMhQB_fdFKmvGSx8TNLOkwbdJ__g3W/preview",
      },
    ],
  },
];

export const processSteps = [
  ["01", "Book", "Reach out and reserve your preferred date."],
  ["02", "Planning", "We discuss ideas, locations and expectations."],
  ["03", "Capture", "Our team creates timeless images and films."],
  ["04", "Delivery", "Your final gallery and videos are professionally delivered."],
];

export const whyUs = [
  "Premium Photography",
  "Cinematic Storytelling",
  "Fast Delivery",
  "Exceptional Quality",
  "Personalized Experience",
  "Professional Team",
];
