export type LandingVariant = {
  id: string;
  path: string;
  title: string;
  description: string;
  heroConfig: any; // Your Hero props
  gaEvent: string; // Analytics tracking
};

export const LANDING_VARIANTS: LandingVariant[] = [
  {
    id: "v1-saas",
    path: "/landing/v1",
    title: "SaaS Landing",
    description: "Modern SaaS dashboard template",
    gaEvent: "saas_landing_view",
    heroConfig: {
      title: "Launch Your SaaS Faster",
      subtitle:
        "All-in-one dashboard template with auth, payments, and analytics.",
    },
  },
  {
    id: "v2-agency",
    path: "/landing/v2",
    title: "Agency Landing",
    description: "Creative agency portfolio template",
    gaEvent: "agency_landing_view",
    heroConfig: {
      title: "Creative Agency Template",
      subtitle: "Perfect for design studios and creative teams.",
    },
  },
];
