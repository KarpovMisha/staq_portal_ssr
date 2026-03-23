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


type Props = {
  name: string;
  label?: string;
  defaultCountry?: string;
  hiddenCountries?: string[];
  placeholder?: string;
  disabled?: boolean;
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
            flags={phoneFlags}
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
