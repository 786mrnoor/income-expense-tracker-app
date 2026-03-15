export default function formatAmount(amount: number) {
  return `${amount >= 0 ? '+' : '-'} ₹${Math.abs(amount)}`
};