import { Link } from "react-router-dom";
import { cx } from "class-variance-authority";
import logoImage from "@/assets/brand-logo.svg";
import { useTranslation } from "react-i18next";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  const { t } = useTranslation("common");

  return (
    <Link
      to="/"
      className={cx(
        "flex items-center gap-3 text-lg font-semibold tracking-tight transition-colors hover:text-primary md:text-xl",
        className,
      )}
      aria-label="Fonij React Template - Home"
    >
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg sm:h-9 sm:w-9">
        <img
          src={logoImage}
          alt={t("brand_name") || "Fonij"}
          className="h-full w-full object-contain"
        />
      </div>
      <span className="hidden font-bold sm:inline md:text-lg">
        {t("brand_name")}
      </span>
    </Link>
  );
};
