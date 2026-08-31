const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export function formatDateTime(input: string): string {
  const date = new Date(input);

  const parts = formatter.formatToParts(date);

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  return `${map.day}-${map.month}-${map.year}, ${map.hour}:${map.minute} ${map.dayPeriod}`;
}

export function formatInputDateTime(date: Date): string {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}
