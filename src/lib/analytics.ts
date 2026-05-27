export const trackLandingView = (eventName: string) => {
  if (typeof window !== "undefined") {
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag("event", eventName, {
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }
};

export const trackCTA = (landingId: string, ctaName: string) => {
  if (typeof window !== "undefined") {
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag("event", "landing_cta_click", {
        landing_variant: landingId,
        cta_name: ctaName,
      });
    }
  }
};
