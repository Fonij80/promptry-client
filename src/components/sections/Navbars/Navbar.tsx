import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { getNavLinks, ROUTES } from "@/constants/routes";
import { LanguageToggle, ThemeToggle } from "@/components/ui/custom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Logo } from "@/components/ui/custom";

type NavLink = {
  label: string;
  to: string;
};

type NavbarProps = {
  brand?: React.ReactNode;
  links?: NavLink[]; // Optional override
  languageSwitcher?: React.ReactNode; // Optional override
  themeToggle?: React.ReactNode; // Optional override
  className?: string;
  showBrand?: boolean;
  showLinks?: boolean;
  showLanguageSwitcher?: boolean;
  showThemeToggle?: boolean;
};

const BrandSection = ({
  showBrand,
  brand,
}: {
  showBrand: boolean;
  brand?: React.ReactNode;
}) => {
  if (!showBrand) return null;
  return <div className="flex items-center">{brand ?? <Logo />}</div>;
};

export const Navbar = ({
  brand,
  links: propLinks,
  languageSwitcher: propLanguageSwitcher,
  themeToggle: propThemeToggle,
  className,
  showBrand = true,
  showLinks = true,
  showLanguageSwitcher = true,
  showThemeToggle = true,
}: NavbarProps) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  // ✅ Smart defaults with priority
  const defaultLinks = getNavLinks(ROUTES);
  const finalLinks = propLinks || defaultLinks;

  const finalLanguageSwitcher = propLanguageSwitcher || <LanguageToggle />;
  const finalThemeToggle = propThemeToggle || <ThemeToggle />;

  const hasLinks = showLinks && finalLinks.length > 0;

  return (
    <header
      className={cn(
        "border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60",
        className,
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        {/* Start: Brand (RTL: right side) */}
        <BrandSection showBrand={showBrand} brand={brand} />

        {/* Desktop nav + actions - RTL ready */}
        <div className="hidden items-center gap-4 md:flex ms-auto rtl:me-auto">
          {hasLinks && (
            <NavigationMenu>
              <NavigationMenuList>
                {finalLinks.map((link) => {
                  const isActive =
                    location.pathname === link.to ||
                    (link.to !== "/" && location.pathname.startsWith(link.to));

                  return (
                    <NavigationMenuItem key={link.to}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        <Link to={link.to}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {showLanguageSwitcher && (
            <div className="flex items-center">{finalLanguageSwitcher}</div>
          )}

          {showThemeToggle && (
            <div className="flex items-center">{finalThemeToggle}</div>
          )}
        </div>

        {/* Mobile actions - RTL ready */}
        <div className="flex items-center gap-2 md:hidden">
          {showLanguageSwitcher && (
            <div className="flex-shrink-0">{finalLanguageSwitcher}</div>
          )}

          {showThemeToggle && (
            <div className="flex-shrink-0">{finalThemeToggle}</div>
          )}

          {hasLinks && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  aria-label="Toggle navigation menu"
                >
                  {open ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Select a page to navigate to
                </SheetDescription>

                <BrandSection showBrand={showBrand} brand={brand} />

                <nav className="mt-4 flex flex-col gap-2">
                  {finalLinks.map((link) => {
                    const isActive =
                      location.pathname === link.to ||
                      (link.to !== "/" &&
                        location.pathname.startsWith(link.to));

                    return (
                      <Button
                        key={link.to}
                        variant="ghost"
                        className={cn(
                          "justify-start text-base",
                          isActive
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground",
                        )}
                        asChild
                        onClick={() => setOpen(false)}
                      >
                        <Link to={link.to}>{link.label}</Link>
                      </Button>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};
