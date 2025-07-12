export const SITE_NAME = "Lacombe Gutters";
export const SITE_DESCRIPTION = "Professional eavestrough, soffit, fascia, and gutter services across central Alberta. 40 years of combined experience.";
export const CONTACT_PHONE_ROB = "1-403-598-9137";
export const CONTACT_PHONE_RYAN = "1-403-396-5393";
export const CONTACT_EMAIL = "lacombegutters@gmail.com";
export const CONTACT_ADDRESS = "170 112 Queensgate crescent Red Deer, AB, Canada, Alberta";
export const FACEBOOK_URL = "https://www.facebook.com/lacombegutters";

// Main navigation items (removed About, Gallery, and FAQ as requested)
export const NAVIGATION_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Why Choose Us", path: "/why-us" },
];

// These items are not in main nav but still available in footer
export const FOOTER_ADDITIONAL_ITEMS = [
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "FAQ", path: "/faq" },
  { label: "Alurex Partner", path: "/alurex-gutter-systems" },
];

export const SERVICE_AREA_BOUNDS = {
  north: "Leduc",
  south: "Airdrie",
  west: "Nordegg",
  east: "Stettler",
  description: "Central Alberta including communities from Airdrie to Leduc, Nordegg to Stettler, and surrounding areas."
};

export const SERVICES = [
  "5\" and 6\" Gutters (aluminum & steel)",
  "Downspouts",
  "Soffit & Fascia",
  "Gutter Cleaning",
  "Industrial-scale Eavestrough",
  "Alurex Continuous Hanger Systems",
  "Gutter Guard Installation",
  "Free Estimates"
];

// Team information for the About page
export const TEAM_MEMBERS = [
  {
    name: "Rob",
    role: "President & Founder",
    bio: "Founder and visionary behind Lacombe Gutters with decades of industry expertise. As President and Operations Manager, Rob oversees all aspects of the business while maintaining the company's commitment to quality craftsmanship.",
    image: "/images/gallery/Rob.png"
  },
  {
    name: "Ryan",
    role: "Co-Owner & Crew Manager",
    bio: "As Co-Owner and Team Lead, Ryan brings exceptional leadership to every project. His hands-on approach to crew management ensures that Lacombe Gutters consistently delivers superior installations that stand the test of time.",
    image: "/images/gallery/Ryan.png"
  }
];

// Alurex SEO Keywords and Phrases
export const ALUREX_SEO_KEYWORDS = [
  "Alurex gutter guard installation Lacombe",
  "continuous hanger system Alberta",
  "DoublePro gutter protection Red Deer",
  "T-Rex gutter system installation",
  "professional gutter guard services",
  "micro-filtration leaf guard Alberta",
  "Alurex continuous hanger Lacombe Alberta",
  "gutter installation experts Red Deer",
  "DoublePro microfiltration system",
  "T-Rex continuous hanger",
  "professional gutter systems Red Deer",
  "Alurex authorized dealer Alberta",
  "gutter guard installation central Alberta",
  "continuous hanger gutter protection",
  "Lacombe gutter guard specialists"
];

export const ALUREX_PRODUCT_INFO = {
  DoublePro: {
    name: "DoublePro® Microfiltration Continuous Hanger™",
    strength: "425 lb per linear foot",
    features: ["Dual-layer perforated aluminum", "Micro-filtration leaf guard", "Continuous hanger support"]
  },
  TRex: {
    name: "T-Rex® Continuous Hanger™",
    strength: "250 lb per linear foot",
    features: ["Integrated continuous hanger", "Lifetime durability", "Professional installation"]
  },
  GutterClean: {
    name: "Gutter Clean System®",
    strength: "All-season protection",
    features: ["Debris blocking", "Ice & snow protection", "Fits existing gutters"]
  }
};
