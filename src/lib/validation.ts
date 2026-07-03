import { z } from "zod";

import { importanceLevels } from "@/types/event";

export const authSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Use at least 6 characters"),
});

export const eventSchema = z.object({
  title: z.string().trim().min(2, "Use at least 2 characters").max(120, "Use up to 120 characters"),
  dateTime: z.date({ error: "Select a date and time" }),
  description: z.string().trim().max(1000, "Use up to 1000 characters"),
  importance: z.enum(importanceLevels),
});
