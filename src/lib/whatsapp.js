import { site } from "../data/site.js";

export function digits(number) {
  return String(number || "").replace(/\D/g, "");
}

export function formatMoney(amount) {
  if (typeof amount !== "number") return `${site.currency} —`;
  return `${site.currency} ${amount.toLocaleString("en-LK")}`;
}

export function cartSubtotal(items) {
  if (!items.length) return null;
  if (items.some((item) => typeof item.price !== "number")) return null;
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function orderMessage(items) {
  const lines = items.map((item) => `• ${item.name} × ${item.qty}`).join("\n");
  const total = cartSubtotal(items);
  const totalLine = total == null ? "" : `\nTotal: ${formatMoney(total)}\n`;
  return `Hi Mr K Ramen! 🍜\n\nI'd like to order:\n\n${lines}\n${totalLine}\nPlease confirm availability and delivery details.`;
}

export function whatsappHref(text) {
  const number = digits(site.whatsappNumber);
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
