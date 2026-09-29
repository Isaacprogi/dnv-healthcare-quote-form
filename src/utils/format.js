/** "2025-05-16" -> "05/16/2025" (the format used throughout the Figma design). */
export function formatDate(iso) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${month}/${day}/${year}`;
}

/** 5976883 -> "5.7MB" */
export function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
