import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard.jsx";
import {
  buildSteps,
  howSteps,
  ingredients,
  mapsDirections,
  mapsEmbed,
  mapsPlace,
  marketCategories,
  reviews,
  site,
  socialPhotos,
  visitPhotos,
} from "../data/site.js";
import { featuredProducts, ramenProducts } from "../data/products.js";
import { useReveal } from "../hooks/useReveal.js";
import { useCart } from "../context/CartContext.jsx";
import { orderMessage, whatsappHref } from "../lib/whatsapp.js";

export function Home({ navigate }) {
  const { items } = useCart();
  const [activeIngredient, setActiveIngredient] = useState("Noodles");
  const sameHours = site.hours.every((slot) => slot.hours === site.hours[0].hours);
  useReveal("home");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    if (reduce || !desktop) return undefined;
    const media = document.querySelector(".hero-media img");
    if (!media) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        media.style.transform = `scale(1.12) translate3d(0, ${y * 0.16}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const orderHref = items.length ? whatsappHref(orderMessage(items)) : whatsappHref(site.visitMessage);
  const visitWhatsapp = whatsappHref(site.visitMessage);

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero-media">
          <img src="/images/hero.jpg" alt="Steaming spicy Korean ramen with a fried egg" />
        </div>
        <div className="hero-shade" />
        <div className="grain" />
        <div className="steam" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="hero-vert">당신만의 라면</p>
        <div className="hero-copy">
          <p className="hero-loc">{site.locationLabel}</p>
          <h1>
            <span>Make your</span>
            <span>ramen.</span>
            <span className="gold">Your way.</span>
          </h1>
          <p className="hero-support">{site.tagline}</p>
          <p className="kr">당신만의 라면</p>
          <div className="hero-actions">
            <button type="button" className="btn btn-red" onClick={() => scrollToId("build")}>
              Make your ramen
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/shop")}>
              Shop Korean food
            </button>
          </div>
        </div>
        <a className="scroll-ind" href="#intro">
          <span>Scroll</span>
          <i />
        </a>
      </section>

      <section className="intro" id="intro">
        <div className="intro-copy reveal">
          <p className="kr">라면을 즐기는 새로운 방법</p>
          <h2>
            Not just ramen.
            <br />
            An experience.
          </h2>
          <p>Pick your ramen. Choose your toppings. Cook it your way.</p>
        </div>
        <figure className="intro-photo reveal">
          <img src="/images/dramatic.jpg" alt="Ramen bowl in dramatic light" />
        </figure>
      </section>

      <section className="build" id="build">
        <div className="build-head reveal">
          <p className="kicker">At the shop</p>
          <h2>
            Build
            <br />
            your bowl
          </h2>
          <p className="kr">나만의 라면</p>
        </div>

        <div className="stage">
          <figure className="bowl-wrap">
            <img src="/images/bowl.jpg" alt="Ramen bowl with egg, corn, and toppings" />
          </figure>
          <p className="bowl-caption">
            <span>{activeIngredient}</span>
            Visit the shop to cook this bowl.
          </p>
          <div className="ingredients" aria-label="Toppings at the shop">
            {ingredients.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`ing ${activeIngredient === item.name ? "is-on" : ""}`}
                style={{ "--x": item.x, "--y": item.y, "--delay": `${index * 0.18}s` }}
                onClick={() => setActiveIngredient(item.name)}
              >
                <img src={item.image} alt="" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        <ol className="steps">
          {buildSteps.map((step) => (
            <li key={step.n} className="reveal">
              <span>{step.n}</span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="build-cta reveal">
          <button type="button" className="btn btn-red" onClick={() => scrollToId("visit")}>
            Visit Mr K Ramen
          </button>
        </div>
      </section>

      <section className="how" id="how">
        <div className="how-head reveal">
          <p className="kicker">How it works</p>
          <h2>Four moves. One bowl.</h2>
        </div>
        <div className="how-grid">
          {howSteps.map((step) => (
            <article key={step.n} className="how-card reveal">
              <img src={step.image} alt="" />
              <div>
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wall" id="ramen">
        <div className="wall-head reveal">
          <p className="kicker">The ramen wall</p>
          <h2>Meet your ramen</h2>
          <button type="button" className="btn btn-dark" onClick={() => navigate("/shop?cat=ramen")}>
            View all ramen
          </button>
        </div>
        <div className="rail rail-light">
          {ramenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="market" id="market">
        <div className="market-copy reveal">
          <p className="kicker">Korean food market</p>
          <h2>
            A little Korea,
            <br />
            at home.
          </h2>
          <div className="chips" aria-label="Shop categories">
            {marketCategories.map((category) => (
              <button key={category.id} type="button" onClick={() => navigate(`/shop?cat=${category.id}`)}>
                <span aria-hidden="true">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-gold" onClick={() => navigate("/shop")}>
            Shop everything
          </button>
        </div>
        <div className="mosaic reveal">
          <img src="/images/instant.jpg" alt="Instant ramen" />
          <img src="/images/snacks.jpg" alt="Snacks" />
          <img src="/images/drinks.jpg" alt="Drinks" />
          <img src="/images/sauce.jpg" alt="Chili sauce" />
        </div>
      </section>

      <section className="featured" id="featured">
        <div className="featured-head reveal">
          <p className="kicker">Take home</p>
          <h2>From the shelf</h2>
        </div>
        <div className="rail rail-lg">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="visit" id="experience">
        <div className="visit-copy reveal">
          <p className="kicker">The shop</p>
          <h2>
            Come.
            <br />
            Cook.
            <br />
            Slurp.
          </h2>
          <p>A hot bowl. Your hands on the cook. Station Road, Ambalangoda.</p>
          <button type="button" className="btn btn-red" onClick={() => scrollToId("visit")}>
            Plan your visit
          </button>
        </div>
        <div className="visit-photos">
          {visitPhotos.map((photo) => (
            <figure key={photo.src} className="reveal">
              <img src={photo.src} alt={photo.alt} />
            </figure>
          ))}
        </div>
      </section>

      <section className="vibe">
        <div className="vibe-red">
          <p className="hangul-bg" aria-hidden="true">
            서울
          </p>
          <p className="kicker kicker-light">The feeling</p>
          <h2>
            Seoul
            <br />
            energy.
          </h2>
        </div>
        <div className="vibe-dark">
          <img src="/images/seoul2.jpg" alt="City lights at night" />
          <div>
            <p className="kr">스리랑카의 마음</p>
            <h2>
              Sri Lankan
              <br />
              soul.
            </h2>
          </div>
        </div>
      </section>

      <section className="reviews" id="reviews">
        <div className="reviews-head reveal">
          <p className="kicker">What people say</p>
          <h2>Hot bowls. Warm room.</h2>
          <p>
            {site.rating.score} from {site.rating.count} {site.rating.source} reviews
          </p>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <blockquote key={review.id} className="reveal">
              <div className="stars" aria-label={`${review.score} out of 5`}>
                {"★".repeat(review.score)}
              </div>
              <p>{review.quote}</p>
              <footer>
                {review.source}
                <span>{review.date}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="find" id="visit">
        <div className="find-copy reveal">
          <p className="kicker kicker-dark">Find us</p>
          <h2>{site.address.name}</h2>
          <address>
            {site.address.street}
            <br />
            {site.address.city}, {site.address.country}
          </address>
          <p className="hours-big">
            {site.hoursSummary}
            <strong>{site.hoursTime}</strong>
          </p>
          {sameHours ? null : (
            <ul className="hours-list">
              {site.hours.map((slot) => (
                <li key={slot.day}>
                  <span>{slot.day}</span>
                  <span>{slot.hours}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="phone">{site.phoneDisplay}</p>
          <div className="find-actions">
            <a className="btn btn-dark" href={mapsDirections()} target="_blank" rel="noreferrer">
              Get directions
            </a>
            {visitWhatsapp ? (
              <a className="btn btn-line" href={visitWhatsapp} target="_blank" rel="noreferrer">
                WhatsApp us
              </a>
            ) : null}
            <a className="btn btn-line" href={mapsPlace()} target="_blank" rel="noreferrer">
              Visit us
            </a>
          </div>
        </div>
        <div className="map">
          <iframe title="Mr. K Ramen on Google Maps" src={mapsEmbed()} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <section className="social">
        <div className="social-head reveal">
          <p className="kicker">Follow the slurp</p>
          <h2>The feed</h2>
          {site.instagramUrl ? (
            <a className="btn btn-gold" href={site.instagramUrl} target="_blank" rel="noreferrer">
              {site.instagramHandle ? `Follow ${site.instagramHandle}` : "Follow on Instagram"}
            </a>
          ) : null}
        </div>
        <div className="ig">
          {socialPhotos.map((photo) => (
            <figure key={photo.src} className="reveal">
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="finale">
        <div className="finale-media">
          <img src="/images/spicy.jpg" alt="" />
        </div>
        <div className="finale-shade" />
        <div className="grain" />
        <div className="finale-copy reveal">
          <p className="kr">당신만의 라면</p>
          <h2>
            Make your ramen.
            <br />
            Your way.
          </h2>
          <div className="hero-actions">
            <button type="button" className="btn btn-red" onClick={() => scrollToId("visit")}>
              Visit the shop
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/shop")}>
              Shop Korean food
            </button>
            {orderHref ? (
              <a className="btn btn-gold" href={orderHref} target="_blank" rel="noreferrer">
                Order on WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
