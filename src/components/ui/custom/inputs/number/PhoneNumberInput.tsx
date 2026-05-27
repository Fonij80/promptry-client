import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CountryCode {
  code: string;
  label: string;
  national: string;
}

interface PhoneNumberInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  showError?: boolean;
  className?: string;
  fixedCountryCode?: string; // New prop for single country mode
}

const COUNTRY_CODES: CountryCode[] = [
  { code: "+98", label: "ایران", national: "09" },
  { code: "+1", label: "آمریکا/کانادا", national: "" },
  { code: "+44", label: "انگلستان", national: "07" },
  { code: "+971", label: "امارات", national: "05" },
  { code: "+966", label: "عربستان", national: "05" },
  { code: "+49", label: "آلمان", national: "" },
  { code: "+33", label: "فرانسه", national: "" },
];

const faDigits = "۰۱۲۳۴۵۶۷۸۹";
const arDigits = "٠١٢٣٤٥٦٧٨٩";

const normalizeDigits = (value: string): string =>
  value.replace(/[۰-۹٠-٩]/g, (ch) => {
    const faIndex = faDigits.indexOf(ch);
    if (faIndex !== -1) return String(faIndex);
    const arIndex = arDigits.indexOf(ch);
    if (arIndex !== -1) return String(arIndex);
    return ch;
  });

const normalizeFullValue = (raw: string): string => {
  let v = normalizeDigits(raw || "")
    .trim()
    .replace(/\s|-/g, "");

  if (!v) return "";

  if (v.startsWith("00")) v = `+${v.slice(2)}`;

  if (/^09\d{9}$/.test(v)) return `+98${v.slice(1)}`;
  if (/^98\d{10}$/.test(v)) return `+${v}`;
  if (/^\+98\d{10}$/.test(v)) return v;

  return v;
};

const parsePhoneNumber = (
  fullNumber: string,
): { code: string; national: string } => {
  const normalized = normalizeFullValue(fullNumber);

  if (normalized.startsWith("+")) {
    for (const country of COUNTRY_CODES) {
      if (normalized.startsWith(country.code)) {
        return {
          code: country.code,
          national: normalized.slice(country.code.length),
        };
      }
    }
    return { code: "", national: normalized.replace(/^\+/, "") };
  }

  return { code: "", national: normalized.replace(/[^\d]/g, "") };
};

const formatFullNumber = (code: string, national: string): string => {
  const country =
    COUNTRY_CODES.find((c) => c.code === code) ?? COUNTRY_CODES[0];
  let n = normalizeDigits(national).replace(/[^\d]/g, "").trim();

  if (country.code === "+98" && n.startsWith("0")) {
    n = n.slice(1);
  }

  return `${country.code}${n}`;
};

const getCountryByCode = (code?: string): CountryCode =>
  COUNTRY_CODES.find((c) => c.code === code) ?? COUNTRY_CODES[0];

export const PhoneNumberInput = ({
  id = "phone_number",
  value,
  onChange,
  label,
  placeholder,
  required,
  error,
  showError = true,
  className,
  fixedCountryCode,
}: PhoneNumberInputProps) => {
  const [national, setNational] = useState("");
  const [selectedCode, setSelectedCode] = useState("+98");

  // Parse initial value
  const parsed = useMemo(() => parsePhoneNumber(value), [value]);
  const isFixedMode = !!fixedCountryCode;

  const currentCountry = useMemo(
    () => getCountryByCode(isFixedMode ? fixedCountryCode : selectedCode),
    [isFixedMode, fixedCountryCode, selectedCode],
  );

  const handleNationalChange = useCallback(
    (newNational: string) => {
      setNational(newNational);
      const fullNumber = formatFullNumber(
        isFixedMode ? fixedCountryCode! : selectedCode,
        newNational,
      );
      onChange(fullNumber);
    },
    [isFixedMode, fixedCountryCode, selectedCode, onChange],
  );

  const handleCountryChange = useCallback(
    (newCode: string) => {
      setSelectedCode(newCode);
      const fullNumber = formatFullNumber(newCode, national);
      onChange(fullNumber);
    },
    [national, onChange],
  );

  // Sync external value changes
  if (parsed.national !== national || parsed.code !== selectedCode) {
    setNational(parsed.national);
    if (!isFixedMode) setSelectedCode(parsed.code || "+98");
  }

  const displayedPlaceholder =
    placeholder || currentCountry.national || "شماره موبایل";

  return (
    <div className={cn("space-y-2 w-full", className)}>
      <Label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </Label>

      <div className="relative">
        <div
          className={cn(
            "flex h-11 w-full items-stretch border bg-background shadow-sm transition-colors",
            "rounded-xl border-border focus-within:border-ring focus-within:ring-1 focus-within:ring-ring",
            error && !showError && "border-destructive",
            "overflow-hidden",
          )}
        >
          {!isFixedMode && (
            <Select value={selectedCode} onValueChange={handleCountryChange}>
              <SelectTrigger
                className={cn(
                  "h-full w-28 shrink-0 border-0 bg-transparent px-3 shadow-none",
                  "data-[placeholder]:text-muted-foreground",
                  "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-48 p-1">
                {COUNTRY_CODES.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="flex items-center gap-2 px-2 py-1.5 cursor-default data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[selected]:font-semibold"
                  >
                    <span className="font-mono text-sm font-semibold">
                      {country.code}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {country.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Input
            id={id}
            type="tel"
            placeholder={displayedPlaceholder}
            value={national}
            onChange={(e) => handleNationalChange(e.target.value)}
            className={cn(
              "h-full flex-1 border-0 bg-transparent px-3 shadow-none placeholder:text-muted-foreground",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "text-sm [&::placeholder]:text-xs",
            )}
            maxLength={15}
            dir="ltr"
          />
        </div>
      </div>

      {showError && error && (
        <p className="text-sm text-destructive px-1">{error}</p>
      )}
    </div>
  );
};
