import { z } from "zod";

import { importanceLevels } from "@/types/event";

export const authSchema = z.object({
  email: z.string().trim().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export const eventSchema = z.object({
  title: z.string().trim().min(2, "Минимум 2 символа").max(120, "До 120 символов"),
  dateTime: z.date({ error: "Выберите дату и время" }),
  description: z.string().trim().max(1000, "До 1000 символов"),
  importance: z.enum(importanceLevels),
});
