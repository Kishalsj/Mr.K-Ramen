import { useEffect, useState } from "react";
import { CartProvider, useCart } from "./context/CartContext.jsx";
import { Header } from "./components/Header.jsx";
import { MobileNav } from "./components/MobileNav.jsx";
import { CartDrawer } from "./components/CartDrawer.jsx";
import { Footer } from "./components/Footer.jsx";
import { Home } from "./pages/Home.jsx";
import { Shop } from "./pages/Shop.jsx";
import { site } from "./data/site.js";

function readLocation() {
  return {
    path: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}

function Shell() {
  const [loc, setLoc] = useState(readLocation);
  const [booting, setBooting] = useState(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !reduce && !sessionStorage.getItem("mrk-intro");
  });
  const { toast, setOpen } = useCart();

  useEffect(() => {
    const onPop = () => setLoc(readLocation());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title =
      loc.path === "/shop" ? "Shop — Mr. K Ramen" : "Mr. K Ramen — Make Your Ramen. Your Way.";
  }, [loc.path]);

  useEffect(() => {
    if (!booting) return undefined;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("mrk-intro", "1");
      setBooting(false);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [booting]);

  useEffect(() => {
    if (!loc.hash) return undefined;
    const timer = window.setTimeout(() => {
      document.querySelector(loc.hash)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [loc]);

  const navigate = (to, options = {}) => {
    const url = new URL(to, window.location.origin);
    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) {
      window.history.pushState({}, "", next);
      setLoc({ path: url.pathname, search: url.search, hash: url.hash });
    }
    if (url.hash) {
      window.setTimeout(() => {
        document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" });
      }, 40);
      return;
    }
    if (!options.keepScroll) window.scrollTo(0, 0);
  };

  const page = loc.path === "/shop" ? <Shop search={loc.search} navigate={navigate} /> : <Home navigate={navigate} />;

  return (
    <>
      <a className="skip" href={loc.path === "/shop" ? "#shop-top" : "#intro"}>
        Skip to content
      </a>
      {booting ? <Intro /> : null}
      <Header path={loc.path} navigate={navigate} />
      <main id="shop-top">{page}</main>
      <Footer navigate={navigate} />
      <MobileNav path={loc.path} navigate={navigate} />
      <CartDrawer navigate={navigate} />
      {toast ? (
        <button type="button" className="toast" onClick={() => setOpen(true)}>
          <span>{toast} added</span>
          <strong>View</strong>
        </button>
      ) : null}
    </>
  );
}

function Intro() {
  return (
    <div className="loader" role="status" aria-label={`Loading ${site.name}`}>
      <span className="logo-mark">K</span>
      <strong>
        MR. K
        <em>RAMEN</em>
      </strong>
      <i />
    </div>
  );
}
