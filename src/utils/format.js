/** Converts an ISO date (YYYY-MM-DD) to display format YYYY/MM/DD. */
export function formatDate(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = String(isoDate).split('-');
  if (!y || !m || !d) return isoDate;
  return `${y}/${m}/${d}`;
}

export function formatProfit(amount) {
  const value = Number(amount);
  if (Number.isNaN(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
}
