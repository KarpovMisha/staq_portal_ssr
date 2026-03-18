import { phoneFlags } from "@/shared/config/phoneFlags";
import { useMemo } from "react";
import { Field } from "react-final-form";
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
  type CountryData,
} from "react-international-phone";
import "react-international-phone/style.css";

// export type PhoneFlag = { iso2: string; src: string };

// const flagSvgs = import.meta.glob('/src/assets/flags/1x1/*.svg', {
//   eager: true,
//   query: '?url',
//   import: 'default',
// }) as Record<string, string>;

// export const phoneFlags: PhoneFlag[] = Object.entries(flagSvgs).map(([path, src]) => {
//   const iso2 = path.split('/').pop()!.replace('.svg', '');
//   return { iso2, src };
// });

type Props = {
  /** react-final-form field name, e.g. "phone" */
  name: string;

  /** Optional label text */
  label?: string;

  /** Default country (iso2), e.g. "se" */
  defaultCountry?: string;

  /** Exclude specific countries by ISO2 (lowercase), e.g. ["il"] */
  hiddenCountries?: string[];

  /** Placeholder for the number input */
  placeholder?: string;

  /** Disable input */
  disabled?: boolean;

  /** Optional wrapper className */
  className?: string;
};

export default function FormPhoneInput({
  name,
  label,
  defaultCountry = "se",
  hiddenCountries = ["il"],
  placeholder = "Phone number",
  disabled = false,
  className,
}: Props) {
  const hidden = useMemo(
    () => new Set(hiddenCountries.map((c) => c.toLowerCase())),
    [hiddenCountries]
  );

  const countries = useMemo<CountryData[]>(() => {
    return defaultCountries.filter((country) => {
      const { iso2 } = parseCountry(country);
      return !hidden.has(iso2);
    });
  }, [hidden]);

  // Optional: keep flags in sync with hiddenCountries too
  const flags = useMemo(() => {
    return phoneFlags.filter((f) => !hidden.has(f.iso2));
  }, [hidden]);

  return (
    <Field<string> name={name}>
      {({ input, meta }) => (
        <div className={className}>
          {label && (
            <label style={{ fontSize: "14px" }} htmlFor={name}>
              {label}
            </label>
          )}

          <PhoneInput
            value={input.value ?? ""}
            onChange={(value) => input.onChange(value)}
            onBlur={input.onBlur}
            disabled={disabled}
            placeholder={placeholder}
            countries={countries}
            defaultCountry={defaultCountry}
            flags={flags}
            inputProps={{
              id: name,
              name,
              inputMode: "tel",
              autoComplete: "tel",
              "aria-invalid": meta.touched && meta.error ? "true" : "false",
            }}
          />

          {meta.touched && meta.error && (
            <div className="formInput__error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}
