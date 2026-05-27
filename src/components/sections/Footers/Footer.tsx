import { Github, Mail, Phone, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type FooterLinkItem = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links?: FooterLinkItem[];
};

type FooterProps = {
  brand?: React.ReactNode;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  newsletter?: React.ReactNode;
  className?: string;
  showSections?: boolean;
  showSocial?: boolean;
  showContact?: boolean;
  showNewsletter?: boolean;
  showCopyright?: boolean;
};

const DEFAULT_SECTIONS: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const DEFAULT_SOCIAL: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/yourusername/fonij-react",
    icon: <Github className="h-4 w-4" />,
  },
];

export const Footer = ({
  brand,
  sections = DEFAULT_SECTIONS,
  socialLinks = DEFAULT_SOCIAL,
  contact = {},
  newsletter,
  className,
  showSections = true,
  showSocial = true,
  showContact = true,
  showNewsletter = true,
  showCopyright = true,
}: FooterProps) => {
  return (
    <footer className={cn("w-full border-t bg-background", className)}>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 lg:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Contact */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {brand ?? (
                <div className="flex items-center gap-2 text-xl font-bold">
                  Fonij
                </div>
              )}
            </div>

            {showContact && Object.values(contact).some(Boolean) && (
              <div className="space-y-2 text-sm text-muted-foreground">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" />
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 hover:text-foreground"
                  >
                    <Phone className="h-4 w-4" />
                    {contact.phone}
                  </a>
                )}
                {contact.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {contact.address}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sections */}
          {showSections && (
            <div className="grid grid-cols-1 gap-8 md:col-span-2 lg:col-span-2 lg:grid-cols-3">
              {sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-semibold text-foreground">
                    {section.title}
                  </h3>
                  {section.links?.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Newsletter */}
          {showNewsletter && newsletter && (
            <div>
              <h3 className="mb-4 font-semibold">Stay Updated</h3>
              {newsletter}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      {showCopyright && (
        <div className="border-t bg-background/50 py-6">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row lg:px-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}. {brand ?? "Fonij React"}. All rights
              reserved.
            </p>

            {showSocial && socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
