export default function formatMoney(value) {
  return value
    ? value.toLocaleString("vi-VI", {
        style: "currency",
        currency: "VND",
      })
    : 0;
}
