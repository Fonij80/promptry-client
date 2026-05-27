import { Footer, ScrollToTop } from "@/components";
import { Navbar } from "@/components/sections/Navbars/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";

export const Layout = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* <NavBar
        logo={<img src="/logo.svg" className="h-8 w-auto" />}
        logoHref="/"
        navItems={navItems}
        sticky={true}
        className="shadow-lg"
      />
      <NavBar theme="dark" navItems={navItems} containerClassName="max-w-6xl" /> */}

      <main className="container mx-auto p-8">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <ScrollRestoration />
    </div>
  );
};
