import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Users, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type HeroStat = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

type HeroFeature = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

type HeroProps = {
  /** Main headline */
  title?: React.ReactNode;

  /** Subtitle/description */
  subtitle?: React.ReactNode;

  /** Primary CTA button */
  primaryCTA?: {
    children: React.ReactNode;
    href: string;
    variant?:
      | "default"
      | "outline"
      | "secondary"
      | "ghost"
      | "destructive"
      | "link";
  };

  /** Secondary CTA button */
  secondaryCTA?: {
    children: React.ReactNode;
    href: string;
    variant?:
      | "default"
      | "outline"
      | "secondary"
      | "ghost"
      | "destructive"
      | "link";
  };

  /** Stats row (e.g. "10k+ users") */
  stats?: HeroStat[];

  /** Feature highlights */
  features?: HeroFeature[];

  /** Background image/video */
  background?: {
    src: string;
    alt: string;
    video?: boolean;
  };

  /** Badges/tags */
  badges?: string[];

  /** Custom className */
  className?: string;

  /** Show/hide sections */
  showStats?: boolean;
  showFeatures?: boolean;
  showBadges?: boolean;
};

const DEFAULT_TITLE = (
  <>
    Build{" "}
    <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
      Beautiful
    </span>{" "}
    React Apps
  </>
);

const DEFAULT_SUBTITLE =
  "Production-ready Vite + shadcn/ui template with routing, i18n, and theming. Start your next project in minutes.";

const DEFAULT_STATS: HeroStat[] = [
  { value: "10K+", label: "Happy Users", icon: <Users className="h-5 w-5" /> },
  { value: "50+", label: "Projects", icon: <Zap className="h-5 w-5" /> },
  { value: "24/7", label: "Support", icon: <Users className="h-5 w-5" /> },
];

const DEFAULT_FEATURES: HeroFeature[] = [
  {
    title: "Multilingual",
    description: "i18n ready with RTL support",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Dark Mode",
    description: "Theme provider included",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "TypeScript",
    description: "Fully typed components",
    icon: <Play className="h-5 w-5" />,
  },
];

const DEFAULT_BADGES = ["React 19", "Vite", "shadcn/ui", "TypeScript"];

export const Hero = ({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  primaryCTA,
  secondaryCTA,
  stats = DEFAULT_STATS,
  features = DEFAULT_FEATURES,
  background,
  badges = DEFAULT_BADGES,
  className,
  showStats = true,
  showFeatures = true,
  showBadges = true,
}: HeroProps) => {
  return (
    <section
      className={cn("relative overflow-hidden py-20 md:py-32", className)}
    >
      {/* Background */}
      {background && (
        <div className="absolute inset-0">
          {background.video ? (
            <video
              src={background.src}
              autoPlay
              loop
              muted
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={background.src}
              alt={background.alt}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Main Content */}
          <div className="space-y-8">
            {/* Badges */}
            {showBadges && badges.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title + Subtitle */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="max-w-xl text-xl text-muted-foreground sm:text-2xl">
                {subtitle}
              </p>
            </div>

            {/* CTAs */}
            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                {primaryCTA && (
                  <Button
                    asChild
                    size="lg"
                    className="min-h-[56px] px-8 text-lg"
                  >
                    <Link to={primaryCTA.href}>
                      {primaryCTA.children}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                )}
                {secondaryCTA && (
                  <Button
                    variant={secondaryCTA.variant ?? "outline"}
                    asChild
                    size="lg"
                    className="min-h-[56px] px-8 text-lg"
                  >
                    <Link to={secondaryCTA.href}>{secondaryCTA.children}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Right: Stats + Features */}
          <div className="space-y-8">
            {showStats && stats.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-background/50 shadow-lg"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        {stat.icon}
                        <CardTitle className="text-3xl font-bold text-foreground">
                          {stat.value}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{stat.label}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {showFeatures && features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Why Choose Us</h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
