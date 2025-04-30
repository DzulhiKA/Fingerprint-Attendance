export function formatToRupiah(value: number | string): string {
  const number =
    typeof value === "string" ? parseInt(value.replace(/\D/g, "")) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number || 0);
}

export function parseRupiahToNumber(value: string): number {
  return parseInt(value.replace(/\D/g, ""), 10) || 0;
}
