import { useState, useEffect, useRef } from "react";

interface NavbarProps {
  logo?: string | React.ReactNode;
  logoHref?: string;
  navItems: Array<{
    label: string;
    href: string;
    target?: string;
  }>;
  ctaText?: string;
  ctaHref?: string;
  ctaVariant?: "primary" | "secondary";
  className?: string;
  containerClassName?: string;
  sticky?: boolean;
  theme?: "light" | "dark" | "auto";
}

export const NavBar: React.FC<NavbarProps> = ({
  logo = "Logo",
  logoHref = "/",
  navItems = [],
  ctaText = "Get Started",
  ctaHref = "/signup",
  ctaVariant = "primary",
  className = "",
  containerClassName = "",
  sticky = true,
  theme = "auto",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseBg = "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md";
  const baseBorder = "border-b border-gray-100 dark:border-gray-800";

  return (
    <nav
      ref={navbarRef}
      className={`
        ${sticky ? "sticky top-0 z-50 transition-all duration-300" : ""}
        ${isScrolled && sticky ? "shadow-sm" : ""}
        ${baseBg} ${baseBorder}
        ${className}
      `}
    >
      <div
        className={`
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        ${containerClassName}
      `}
      >
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href={logoHref}
              className="flex items-center space-x-2 text-xl font-bold group"
            >
              {typeof logo === "string" ? (
                <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {logo}
                </span>
              ) : (
                logo
              )}
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.target}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02] border-b-2 border-transparent hover:border-blue-500"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            {ctaText && (
              <a
                href={ctaHref}
                className={`
                  px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 transform
                  hover:scale-[1.02] hover:shadow-lg
                  ${
                    ctaVariant === "primary"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                {ctaText}
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.target}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
            {ctaText && (
              <a
                href={ctaHref}
                onClick={() => setIsOpen(false)}
                className={`
                  block w-full text-center px-6 py-3 text-base font-semibold rounded-xl transition-all duration-200 mt-4
                  ${
                    ctaVariant === "primary"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                {ctaText}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
