import { useMemo } from "react";
import { ProductCard } from "../components/ProductCard.jsx";
import { shopCategories, site } from "../data/site.js";
import { products } from "../data/products.js";
import { useReveal } from "../hooks/useReveal.js";

export function Shop({ search, navigate }) {
  const requested = new URLSearchParams(search).get("cat") || "all";
  const cat = shopCategories.some((category) => category.id === requested) ? requested : "all";
  useReveal(`${search}:${cat}`);

  const visible = useMemo(
    () => (cat === "all" ? products : products.filter((product) => product.category === cat)),
    [cat],
  );

  const select = (id) => {
    navigate(id === "all" ? "/shop" : `/shop?cat=${id}`, { keepScroll: true });
  };

  return (
    <div className="page shop">
      <header className="shop-hero">
        <p className="kicker">Korean food</p>
        <h1>Mr K Ramen Shop</h1>
        <p className="shop-sub">Korean favorites. Delivered to your door.</p>
        <p className="shop-note">Prices confirmed when you order on WhatsApp.</p>
      </header>

      <div className="cats" role="tablist" aria-label="Product categories">
        {shopCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={cat === category.id}
            className={cat === category.id ? "is-on" : ""}
            onClick={() => select(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="shop-grid">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} withQty />
        ))}
      </div>

      {visible.length === 0 ? <p className="shop-empty">Nothing on this shelf yet.</p> : null}

      <p className="shop-foot">{site.address.city} · Order by WhatsApp · {site.hoursSummary}</p>
    </div>
  );
}
