export function formatRelativeTime(dateIso: string): string {
  const date = new Date(dateIso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "только что";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    const n = diffMin;
    const word =
      n % 10 === 1 && n % 100 !== 11
        ? "минута"
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? "минуты"
          : "минут";
    return `${n} ${word} назад`;
  }
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    const n = diffHours;
    const word =
      n % 10 === 1 && n % 100 !== 11
        ? "час"
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? "часа"
          : "часов";
    return `${n} ${word} назад`;
  }
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    const n = diffDays;
    const word =
      n % 10 === 1 && n % 100 !== 11
        ? "день"
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? "дня"
          : "дней";
    return `${n} ${word} назад`;
  }
  // fallback на локальное форматирование даты (кратко)
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
