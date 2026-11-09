import { site } from "../data/site.js";
import { useCart } from "../context/CartContext.jsx";
import { whatsappHref } from "../lib/whatsapp.js";

export function MobileNav({ path, navigate }) {
  const { count, setOpen } = useCart();
  const whatsapp = whatsappHref(site.helloMessage);

  return (
    <nav className="tabbar" aria-label="Mobile">
      <button type="button" className={path === "/" ? "is-on" : ""} onClick={() => navigate("/")}>
        <HomeIcon />
        Home
      </button>
      <button type="button" className={path === "/shop" ? "is-on" : ""} onClick={() => navigate("/shop")}>
        <ShopIcon />
        Shop
      </button>
      <button type="button" onClick={() => navigate("/#build")}>
        <BowlIcon />
        Ramen
      </button>
      <button type="button" onClick={() => setOpen(true)}>
        <BagIcon />
        Cart
        {count > 0 ? <i>{count}</i> : null}
      </button>
      {whatsapp ? (
        <a href={whatsapp} target="_blank" rel="noreferrer">
          <WaIcon />
          WhatsApp
        </a>
      ) : (
        <span className="tab-muted">
          <WaIcon />
          WhatsApp
        </span>
      )}
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 11.5 12 5l8 6.5V20H4v-8.5z" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ShopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9h16l-1.2 10H5.2L4 9zM8 9V7a4 4 0 0 1 8 0v2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function BowlIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 11h16c-.6 5-3.4 8-8 8s-7.4-3-8-8zM8 11c.4-3 1.6-5 4-5s3.6 2 4 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7h12l-1 12H7L6 7zM9 7V6a3 3 0 0 1 6 0v1" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 18.5 5 20l.7-3A8 8 0 1 1 9 19.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M9 10.5c.2 2 1.8 3.6 3.8 4 .4 0 .8-.3 1-.6l.6-1.1-1.3-.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
