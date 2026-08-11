/**
 * Formats date string into locale date format (en-US).
 */
export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return 'N/A'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * Returns rating text color class based on vote average.
 */
export function getRatingColor(rating: number): string {
  if (rating >= 7.5) return 'text-green-400'
  if (rating >= 6) return 'text-yellow-400'
  return 'text-red-400'
}

/**
 * Returns TMDB image URL with size path.
 */
export function getTMDBImageUrl(path: string | null, size: string = 'w500'): string | null {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}
