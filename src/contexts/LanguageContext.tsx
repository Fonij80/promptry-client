import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext<{
  dir: "ltr" | "rtl";
  language: string;
} | null>(null);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslation();
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  useEffect(() => {
    const initialDir = i18n.language.startsWith("fa") ? "rtl" : "ltr";
    setDir(initialDir);

    document.documentElement.dir = initialDir;
    document.documentElement.lang = i18n.language;
    document.documentElement.classList.toggle("rtl", initialDir === "rtl");

    const id = i18n.on("languageChanged", (lng: string) => {
      const newDir = lng.startsWith("fa") ? "rtl" : "ltr";
      setDir(newDir);

      document.documentElement.dir = newDir;
      document.documentElement.lang = lng;
      document.documentElement.classList.toggle("rtl", newDir === "rtl");
    });

    setSubscriptionId(id);

    return () => {
      if (subscriptionId) {
        i18n.off("languageChanged", subscriptionId);
      }
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ dir, language: i18n.language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
