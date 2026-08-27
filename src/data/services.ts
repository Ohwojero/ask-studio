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
        title: "Pregnancy Shoot",
        description: "Celebrate the beauty of motherhood with elegant maternity portraits that capture the joy, strength, and anticipation of this unforgettable journey.",
        image: "/images/baby/baby2.jpeg",
        icon: Heart,
      },
      {
        title: "Newborn & Baby Photography",
        description: "Gentle, heartwarming portraits celebrating every precious stage of your baby's journey.",
        image: "/images/baby/baby1.jpg",
        icon: Heart,
      },
      {
        title: "Corporate Headshots",
        description: "Professional portraits designed for executives, entrepreneurs, brands and business professionals.",
        image: "/images/portraits/portraits8.jpeg",
        icon: Users,
      },
    ],
  },
  {
    title: "Wedding Coverage",
    intro: "Photography and films for traditional weddings, white weddings, pre-weddings, and celebrations.",
    items: [
      {
        title: "Traditional Wedding",
        description: "Capturing culture, joy and unforgettable traditions.",
        image: "/images/weddings/wedding1.jpeg",
        icon: Sparkles,
      },
      {
        title: "White Wedding",
        description: "Beautiful storytelling from the aisle to the reception.",
        image: "/images/weddings/wedding8.jpeg",
        icon: Heart,
      },
      {
        title: "Pre-Wedding Session",
        description: "Creative engagement sessions that tell your unique love story.",
        image: "/images/weddings/wedding12.jpeg",
        icon: Sparkles,
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
        video: "https://your-cloud-storage.com/wedding-highlight.mp4",
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
