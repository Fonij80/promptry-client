// src/components/sections/features.tsx
"use client";

import * as React from "react";
import { CheckCircle, Zap, Shield, Clock, Users, Code } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FeatureItem = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: "default" | "premium" | "new";
};

type FeaturesGridProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  features: FeatureItem[];
  className?: string;
};

type FeaturesProps = {
  /** Landing variant ID for styling/content */
  variant: string;

  /** Override default features */
  features?: FeatureItem[];

  /** Section title/subtitle */
  title?: string;
  subtitle?: string;

  /** Layout options */
  layout?: "grid" | "zigzag" | "carousel";
  cols?: 2 | 3 | 4;

  /** Show/hide elements */
  showStats?: boolean;
  showBadges?: boolean;

  /** Custom className */
  className?: string;
};

// Default features per landing variant
const DEFAULT_FEATURES: Record<string, FeatureItem[]> = {
  "v1-saas": [
    {
      title: "Lightning Fast",
      description: "Built with Vite + React 19 for sub-second builds and HMR.",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      title: "Full TypeScript",
      description: "100% type-safe components and utilities.",
      icon: <Code className="h-8 w-8" />,
      variant: "premium",
    },
    {
      title: "Dark Mode Ready",
      description: "Theme provider with system preference detection.",
      icon: <Shield className="h-8 w-8" />,
    },
    {
      title: "i18n Support",
      description: "Multilingual with RTL and namespace support.",
      icon: <Users className="h-8 w-8" />,
      variant: "new",
    },
    {
      title: "Production Ready",
      description: "SEO, accessibility, and performance optimized.",
      icon: <CheckCircle className="h-8 w-8" />,
    },
    {
      title: "shadcn/ui",
      description: "Copy-paste components with full customization.",
      icon: <Clock className="h-8 w-8" />,
    },
  ],
  "v2-agency": [
    {
      title: "Modern Design",
      description: "Tailwind CSS v4 + shadcn/ui design system.",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      title: "Fully Responsive",
      description: "Mobile-first design that works everywhere.",
      icon: <Shield className="h-8 w-8" />,
      variant: "premium",
    },
    {
      title: "Easy to Customize",
      description: "Props-driven components, no digging through CSS.",
      icon: <Code className="h-8 w-8" />,
    },
    {
      title: "Fast Performance",
      description: "Optimized bundle with code splitting.",
      icon: <Clock className="h-8 w-8" />,
    },
  ],
  default: [
    {
      title: "Fast & Reliable",
      description: "Built for production with modern tooling.",
      icon: <CheckCircle className="h-8 w-8" />,
    },
    {
      title: "Developer Friendly",
      description: "Intuitive APIs and excellent DX.",
      icon: <Code className="h-8 w-8" />,
    },
  ],
};

const FeaturesGrid = ({
  title,
  subtitle,
  features,
  className,
}: FeaturesGridProps) => (
  <div className={cn("space-y-12", className)}>
    {(title || subtitle) && (
      <div className="max-w-4xl text-center space-y-4 mx-auto">
        {title && (
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground sm:text-2xl">
            {subtitle}
          </p>
        )}
      </div>
    )}

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <CardHeader className="pb-4">
            <div
              className={cn(
                "mx-auto mb-4 h-16 w-16 rounded-2xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300",
                feature.variant === "premium" &&
                  "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-yellow-500/25",
                feature.variant === "new" &&
                  "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/25",
                feature.variant !== "premium" &&
                  feature.variant !== "new" &&
                  "bg-primary/10 text-primary",
              )}
            >
              {feature.icon}
            </div>
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-muted-foreground">
              {feature.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const Features = ({
  variant = "default",
  features: customFeatures,
  title = "Why Choose Us",
  subtitle = "Everything you need to build fast, modern React applications",
  layout = "grid",
  cols = 3,
  showStats = true,
  showBadges = false,
  className,
}: FeaturesProps) => {
  // Get features based on variant or custom
  const defaultFeatures = DEFAULT_FEATURES[variant] || DEFAULT_FEATURES.default;
  const finalFeatures = customFeatures || defaultFeatures;

  return (
    <section className={cn("py-20 md:py-32 bg-background/50", className)}>
      <div className="container mx-auto px-4">
        <FeaturesGrid
          title={title}
          subtitle={subtitle}
          features={finalFeatures}
          className="max-w-7xl mx-auto"
        />
      </div>
    </section>
  );
};
