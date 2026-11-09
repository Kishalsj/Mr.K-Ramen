import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { formatMoney } from "../lib/whatsapp.js";

export function ProductCard({ product, withQty = false }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product, withQty ? qty : 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 700);
  };

  return (
    <article className={`pcard ${added ? "is-added" : ""}`}>
      <div className="pcard-media">
        {product.badge ? <span className={`badge badge-${badgeTone(product.badge)}`}>{product.badge}</span> : null}
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
      </div>
      <div className="pcard-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="pcard-meta">
          <span className={`price ${product.price == null ? "is-open" : ""}`}>{formatMoney(product.price)}</span>
          {withQty ? (
            <div className="stepper" aria-label={`Quantity for ${product.name}`}>
              <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((value) => value + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>
          ) : null}
        </div>
        <button type="button" className="btn btn-red pcard-add" onClick={onAdd}>
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

function badgeTone(badge) {
  if (badge === "BEST SELLER") return "gold";
  if (badge === "KOREAN PICK") return "line";
  return "hot";
}
