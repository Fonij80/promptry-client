import { useParams, useSearchParams } from "react-router-dom";
import { LANDING_VARIANTS } from "./config";
import { Hero, Features } from "@/components";
import { trackLandingView } from "@/lib/analytics";
import { useEffect } from "react";

export const LandingPage = () => {
  const { variant } = useParams<{ variant: string }>();
  const searchParams = useSearchParams();

  const landing = LANDING_VARIANTS.find((l) => l.id === variant);

  if (!landing) {
    return <div>Landing not found</div>;
  }

  // Track GA event
  useEffect(() => {
    trackLandingView(landing.gaEvent);
  }, [landing.gaEvent]);

  return (
    <div className="min-h-screen">
      <Hero {...landing.heroConfig} />
      <Features variant={landing.id} />
      {/* Other shared sections */}
    </div>
  );
};
