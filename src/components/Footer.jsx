import { site, mapsDirections } from "../data/site.js";
import { whatsappHref } from "../lib/whatsapp.js";
import { Logo } from "./Logo.jsx";

export function Footer({ navigate }) {
  const whatsapp = whatsappHref(site.visitMessage);

  return (
    <footer className="footer">
      <Logo onClick={() => navigate("/")} />
      <p>
        {site.address.street}
        <br />
        {site.address.city}, {site.address.country}
      </p>
      <p>
        {site.hoursSummary}
        <br />
        {site.hoursTime}
      </p>
      <div className="footer-links">
        <button type="button" onClick={() => navigate("/shop")}>
          Shop
        </button>
        <a href={mapsDirections()} target="_blank" rel="noreferrer">
          Directions
        </a>
        {whatsapp ? (
          <a href={whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        ) : null}
      </div>
    </footer>
  );
}
