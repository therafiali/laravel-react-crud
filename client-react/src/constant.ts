export const PAGES = {
  "about-us": { id: 1, title: "About Us", description: "Learn more about our company." },
  "contact": { id: 2, title: "Contact", description: "Get in touch with us." },
  "services": { id: 3, title: "Services", description: "Explore our services." },
  "blog": { id: 4, title: "Blog", description: "Read our latest articles." },
} as const;


export const PAGES_ARRAY = Object.entries(PAGES).map(([key, value]) => ({
  key,
  ...value,
}));

