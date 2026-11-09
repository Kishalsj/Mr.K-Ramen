import { createContext, useContext, useEffect, useState } from "react";
import { site } from "../data/site.js";
import { cartSubtotal } from "../lib/whatsapp.js";

const CartContext = createContext(null);
const STORAGE_KEY = "mrk-ramen-cart";

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const add = (product, qty = 1) => {
    const amount = Math.max(1, qty);
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + amount } : item,
        );
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: amount,
        },
      ];
    });
    setToast(product.name);
    if (site.openCartOnAdd) setOpen(true);
  };

  const setQty = (id, qty) => {
    setItems((current) => {
      if (qty <= 0) return current.filter((item) => item.id !== id);
      return current.map((item) => (item.id === id ? { ...item, qty } : item));
    });
  };

  const remove = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clear = () => setItems([]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartSubtotal(items);

  return (
    <CartContext.Provider
      value={{ items, open, setOpen, add, setQty, remove, clear, count, subtotal, toast, setToast }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
