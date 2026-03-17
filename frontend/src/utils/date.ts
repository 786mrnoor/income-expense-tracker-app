/**
 * Converts a date string in the format YYYY-MM-DD to a Date object
 * representing the same date in the local timezone.
 * @param dateString - a date string in the format YYYY-MM-DD
 * @returns a Date object representing the same date in the local timezone
 */
export function toLocalDate(dateString: string) {
  const [year, month, date] = dateString.split('-').map(Number);
  const localDate = new Date(year, month - 1, date);

  return localDate;
}

/**
 * Returns a date string in the format YYYY-MM-DD
 * @param date - a Date object
 * @returns a string representing the date in YYYY-MM-DD format
 */
export function toDateString(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Add 1 because months are 0-indexed
  const day = date.getDate();

  // Format as YYYY-MM-DD
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return formattedDate;
}