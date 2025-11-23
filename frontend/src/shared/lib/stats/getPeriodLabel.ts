import { Period } from "@/shared/api/stats/types";

export const getPeriodLabel = (period: Period): string => {
  if (period === "today") return "Сегодня";
  if (period === "week") return "Последние 7 дней";
  return "Последние 30 дней";
};
