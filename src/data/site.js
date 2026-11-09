/**
 * SITE SETTINGS — edit this file to update the live website.
 *
 * Replace later without touching the layout:
 * logoText, whatsappNumber, hours, instagramUrl, reviews, address, gallery.
 *
 * whatsappNumber: digits only, with country code, no plus sign.
 * The number below is the published business phone from the public listing.
 * Replace it if WhatsApp uses a different line.
 *
 * instagramUrl / instagramHandle: leave empty until the shop account is confirmed.
 * prices live in src/data/products.js (null until the real shelf prices are set).
 */

export const site = {
  name: "Mr. K Ramen",
  logo: {
    line1: "MR. K",
    line2: "RAMEN",
    mark: "K",
  },
  tagline: "Korean ramen. Your ingredients. Your bowl.",
  locationLabel: "Ambalangoda · Sri Lanka",
  address: {
    name: "Mr. K Ramen",
    street: "Station Road",
    city: "Ambalangoda",
    country: "Sri Lanka",
    lat: 6.235428,
    lng: 80.054731,
  },
  phoneDisplay: "+94 76 191 9895",
  whatsappNumber: "94761919895",
  openCartOnAdd: false,
  currency: "LKR",
  instagramUrl: "",
  instagramHandle: "",
  hoursSummary: "Open daily",
  hoursTime: "10:00 AM – 10:00 PM",
  hours: [
    { day: "Monday", hours: "10:00 AM – 10:00 PM" },
    { day: "Tuesday", hours: "10:00 AM – 10:00 PM" },
    { day: "Wednesday", hours: "10:00 AM – 10:00 PM" },
    { day: "Thursday", hours: "10:00 AM – 10:00 PM" },
    { day: "Friday", hours: "10:00 AM – 10:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 10:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 10:00 PM" },
  ],
  rating: {
    score: "5.0",
    count: 6,
    source: "Google",
  },
  visitMessage: "Hi Mr K Ramen! I'd like to visit the shop.",
  helloMessage: "Hi Mr K Ramen! 🍜",
};

export const reviews = [
  {
    id: "r1",
    quote:
      "Had a really good experience at Mr. K Ramen. The food was great, but what honestly stood out the most was the service. The staff were super friendly, welcoming, and attentive from the moment we walked in. They were patient when explaining the menu and made sure we were comfortable throughout the whole visit.",
    score: 5,
    source: "Google review",
    date: "May 2026",
  },
  {
    id: "r2",
    quote:
      "I had a great experience at Mr. K Ramen in Ambalangoda. The self cooking Korean ramen concept is fun and unique. Tasty foods and a cozy atmosphere. Highly recommended for anyone craving delicious Korean ramen.",
    score: 5,
    source: "Google review",
    date: "Feb 2026",
  },
  {
    id: "r3",
    quote: "Good food and good service. Highly recommended!",
    score: 5,
    source: "Google review",
    date: "Feb 2026",
  },
];

export const ingredients = [
  { name: "Noodles", image: "/images/noodles.jpg", x: "4%", y: "18%" },
  { name: "Egg", image: "/images/egg.jpg", x: "78%", y: "8%" },
  { name: "Cheese", image: "/images/cheese.jpg", x: "86%", y: "36%" },
  { name: "Mushrooms", image: "/images/mushroom.jpg", x: "74%", y: "66%" },
  { name: "Spring Onion", image: "/images/scallion.jpg", x: "6%", y: "58%" },
  { name: "Corn", image: "/images/corn.jpg", x: "16%", y: "34%" },
  { name: "Chicken", image: "/images/chicken.jpg", x: "42%", y: "2%" },
  { name: "Seafood", image: "/images/seafood.jpg", x: "46%", y: "78%" },
  { name: "Kimchi", image: "/images/kimchi.jpg", x: "62%", y: "6%" },
  { name: "Chili", image: "/images/chili.jpg", x: "18%", y: "78%" },
  { name: "Sauce", image: "/images/sauce.jpg", x: "88%", y: "56%" },
];

export const buildSteps = [
  { n: "01", title: "Pick your ramen", text: "Start with the bowl you want." },
  { n: "02", title: "Choose your toppings", text: "Egg, cheese, kimchi, heat." },
  { n: "03", title: "Turn up the heat", text: "Spice it. Soften it. Make it loud." },
  { n: "04", title: "Cook it your way", text: "The station is yours." },
  { n: "05", title: "Slurp", text: "Hot bowl. Your bowl." },
];

export const howSteps = [
  {
    n: "01",
    title: "Choose",
    text: "Choose your Korean ramen.",
    image: "/images/instant.jpg",
  },
  {
    n: "02",
    title: "Customize",
    text: "Pick your toppings and extras.",
    image: "/images/bowl.jpg",
  },
  {
    n: "03",
    title: "Cook",
    text: "Prepare your ramen yourself.",
    image: "/images/spicy.jpg",
  },
  {
    n: "04",
    title: "Enjoy",
    text: "Make it yours. Eat it hot.",
    image: "/images/egg-ramen.jpg",
  },
];

export const marketCategories = [
  { id: "ramen", label: "Ramen", icon: "🍜" },
  { id: "snacks", label: "Snacks", icon: "🥢" },
  { id: "drinks", label: "Drinks", icon: "🥤" },
  { id: "sauces", label: "Sauces", icon: "🌶️" },
  { id: "toppings", label: "Toppings", icon: "🥚" },
  { id: "foods", label: "Korean Foods", icon: "🍙" },
  { id: "combos", label: "Combos", icon: "🎁" },
];

export const shopCategories = [
  { id: "all", label: "All" },
  { id: "ramen", label: "Ramen" },
  { id: "snacks", label: "Snacks" },
  { id: "drinks", label: "Drinks" },
  { id: "sauces", label: "Sauces" },
  { id: "toppings", label: "Toppings" },
  { id: "foods", label: "Korean Food" },
  { id: "combos", label: "Combos" },
];

/** Atmospheric stand-ins. Swap src for real Mr. K Ramen photographs. */
export const visitPhotos = [
  {
    src: "/images/street.jpg",
    alt: "Night street-food stall with Korean signage",
  },
  {
    src: "/images/interior.jpg",
    alt: "Dark dining room with warm light",
  },
  {
    src: "/images/seoul.jpg",
    alt: "Seoul street at night",
  },
];

/** Replace with the shop's own Instagram frames when the account is connected. */
export const socialPhotos = [
  { src: "/images/hero.jpg", alt: "Steaming Korean ramen" },
  { src: "/images/dramatic.jpg", alt: "Ramen in dramatic light" },
  { src: "/images/classic.jpg", alt: "Ramen bowl with egg and toppings" },
  { src: "/images/spicy.jpg", alt: "Red spicy noodles" },
  { src: "/images/bowl2.jpg", alt: "Noodle bowl" },
  { src: "/images/lift.jpg", alt: "Bowl of ramen" },
];

export function mapsEmbed() {
  const { lat, lng } = site.address;
  return `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=16&output=embed`;
}

export function mapsDirections() {
  const { lat, lng } = site.address;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function mapsPlace() {
  const { lat, lng } = site.address;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
