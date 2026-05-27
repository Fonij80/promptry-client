import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

interface BlogLayoutProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export const BlogLayout = ({ title, subtitle, children }: BlogLayoutProps) => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Header */}
      {(title || subtitle) && (
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-4xl font-black tracking-tight text-transparent drop-shadow-sm sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-xl text-muted-foreground sm:text-2xl">
              {subtitle}
            </p>
          )}
          <Separator className="mx-auto mt-8 w-24 bg-gradient-to-r from-primary/50 to-secondary/50" />
        </div>
      )}

      <div>{children}</div>
    </section>
  );
};
