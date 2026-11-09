import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { Logo } from "./Logo.jsx";

export function Header({ path, navigate }) {
  const { count, setOpen } = useCart();
  const [solid, setSolid] = useState(path !== "/");

  useEffect(() => {
    const onScroll = () => setSolid(path !== "/" || window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  return (
    <header className={`header ${solid ? "is-solid" : ""}`}>
      <Logo onClick={() => navigate("/")} />
      <nav className="desk-nav" aria-label="Primary">
        <button type="button" onClick={() => navigate("/#build")}>
          Bowl
        </button>
        <button type="button" onClick={() => navigate("/#ramen")}>
          Ramen
        </button>
        <button type="button" className={path === "/shop" ? "is-on" : ""} onClick={() => navigate("/shop")}>
          Shop
        </button>
        <button type="button" onClick={() => navigate("/#visit")}>
          Visit
        </button>
      </nav>
      <button type="button" className="cart-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
        <CartIcon />
        <span>Cart</span>
        {count > 0 ? <i key={count}>{count}</i> : null}
      </button>
    </header>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 7h12l-1 12H7L6 7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M9 7V6a3 3 0 0 1 6 0v1" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
