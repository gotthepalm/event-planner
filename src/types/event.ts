export const importanceLevels = ["normal", "important", "critical"] as const;

export type EventImportance = (typeof importanceLevels)[number];

export type PlannerEvent = {
  id: string;
  ownerId: string;
  title: string;
  dateTime: Date;
  description: string;
  importance: EventImportance;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type EventFormValues = {
  title: string;
  dateTime: Date;
  description: string;
  importance: EventImportance;
};

export const importanceLabels: Record<EventImportance, string> = {
  normal: "Обычная",
  important: "Важная",
  critical: "Критическая",
};

export const importanceColors: Record<EventImportance, "default" | "warning" | "error"> = {
  normal: "default",
  important: "warning",
  critical: "error",
};
