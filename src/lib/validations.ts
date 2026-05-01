import { z } from 'zod';

export const userProfileSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
});

export const searchBoothSchema = z.object({
  query: z.string().min(3, "Search query must be at least 3 characters").max(100),
  district: z.string().optional(),
});

export const registrationSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().refine((date) => {
    const age = (new Date().getTime() - new Date(date).getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    return age >= 18;
  }, "You must be at least 18 years old to register"),
  zipCode: z.string().regex(/^[0-9]{6}$/, "Must be a valid 6-digit Indian PIN code")
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type SearchBoothInput = z.infer<typeof searchBoothSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
