import { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext.jsx";
import { formatMoney, orderMessage, whatsappHref } from "../lib/whatsapp.js";

export function CartDrawer({ navigate }) {
  const { items, open, setOpen, setQty, remove, count, subtotal } = useCart();
  const closeRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("lock", open);
    if (open) closeRef.current?.focus();
    return () => document.body.classList.remove("lock");
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;

  const orderHref = items.length ? whatsappHref(orderMessage(items)) : "";

  return (
    <div className="drawer-root">
      <button type="button" className="drawer-back" aria-label="Close cart" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your cart">
        <header className="drawer-head">
          <div>
            <p className="kicker">Your order</p>
            <h2>Cart {count > 0 ? <span>{count}</span> : null}</h2>
          </div>
          <button ref={closeRef} type="button" className="icon-x" onClick={() => setOpen(false)} aria-label="Close">
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <p>Your cart is empty.</p>
            <button
              type="button"
              className="btn btn-red"
              onClick={() => {
                setOpen(false);
                navigate("/shop");
              }}
            >
              Shop Korean food
            </button>
          </div>
        ) : (
          <ul className="drawer-list">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt="" />
                <div>
                  <strong>{item.name}</strong>
                  <span className={item.price == null ? "price is-open" : "price"}>{formatMoney(item.price)}</span>
                  <div className="stepper">
                    <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label={`Decrease ${item.name}`}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label={`Increase ${item.name}`}>
                      +
                    </button>
                  </div>
                </div>
                <button type="button" className="text-x" onClick={() => remove(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 ? (
          <footer className="drawer-foot">
            <div className="subtotal">
              <span>Subtotal</span>
              <strong>{subtotal == null ? "Confirmed on WhatsApp" : formatMoney(subtotal)}</strong>
            </div>
            {orderHref ? (
              <a className="btn btn-gold btn-block" href={orderHref} target="_blank" rel="noreferrer">
                Order via WhatsApp
              </a>
            ) : (
              <p className="fine">Add the shop WhatsApp number in site settings to send this order.</p>
            )}
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
