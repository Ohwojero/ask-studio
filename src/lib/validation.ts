import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(6, "Enter your phone number."),
  service: z.string().min(2, "Choose a service."),
  preferredDate: z.string().min(1, "Choose a preferred date."),
  preferredTime: z.string().optional(),
  message: z.string().min(10, "Tell us a little about the session."),
});

export const portfolioSchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  description: z.string().optional(),
  imageUrl: z.string().min(2),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.boolean().default(true),
});
