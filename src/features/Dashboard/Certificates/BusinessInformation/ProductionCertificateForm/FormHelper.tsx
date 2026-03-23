'use client';
import { InputHTMLAttributes } from 'react';
import { useField } from 'react-final-form';
import { phoneFlags } from "@/shared/config/phoneFlags";
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

import { FormInput, FormNumberInput } from '@/ui/elements/Form';
import SuccessIcon from '@/ui/icons/check_success.svg';
import styles from './ProductionCertificateForm.module.scss';

/**
 * Convert an ISO-2 country code to its emoji flag representation.
 */
function countryCodeToFlagEmoji(code: string) {
  if (!code) return '';
  const base = 127397; // regional indicator symbol offset
  return code
    .toUpperCase()
    .split('')
    .map((ch) => String.fromCodePoint(base + ch.charCodeAt(0)))
    .join('');
}

/**
 * Return [{ code, name, flag }] for all countries (English), excluding Israel (IL).
 */
export function getCountriesWithFlags() {
  // ensure English names are registered
  try {
    countries.registerLocale(enLocale);
  } catch (e) {
    /* already registered */
  }

  const names = countries.getNames('en') || {};
  return Object.entries(names)
    .filter(([code]) => code !== 'IL')
    .map(([code, name]) => ({ code, name: String(name), flag: countryCodeToFlagEmoji(code) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Build `react-select`-style options array: first an empty placeholder,
 * then the user's country (if detected), then the rest alphabetically.
 * Each option is { value: ISO2, label: '🇺🇸 United States' }.
 */
export function getCountryOptions() {
  const countriesList = getCountriesWithFlags();

  const mapped = countriesList.map((c) => ({
    value: c.code,
    label: (
      <>
        <span className={`flagCircle fi fi-${c.code.toLowerCase()}`} aria-hidden />
        <span>{c.name}</span>
      </>
    ),
  }));
  const placeholder = { value: '', label: <></> };

  const rest = mapped.slice();
  const options = [placeholder];

  return options.concat(rest);
}

export function ValidatedTextInput({ name, ...rest }: { name: string } & InputHTMLAttributes<HTMLInputElement>) {
  const { input, meta } = useField(name, {
    subscription: { touched: true, error: true, active: true, dirty: true, value: true },
  });

  const hasValue = !!input.value;
  const isValid = (meta.touched || hasValue) && !meta.error;

  return (
    <div className={styles.inputWithCheck}>
      <FormInput {...rest} name={name} />
      {isValid && (
        <span className={styles.validIcon} aria-hidden>
          <SuccessIcon />
        </span>
      )}
    </div>
  );
}

export function ValidatedNumberInput({ name, format = 'none', ...rest }: { name: string; format?: 'group' | 'none' } & InputHTMLAttributes<HTMLInputElement>) {
  const { input, meta } = useField(name, {
    subscription: { touched: true, error: true, active: true, dirty: true, value: true },
  });

  const hasValue = !!input.value;
  const isValid = (meta.touched || hasValue) && !meta.error;

  return (
    <div className={styles.inputWithCheck}>
      <FormNumberInput name={name} format={format} {...rest} />
      {isValid && (
        <span className={styles.validIcon} aria-hidden>
          <SuccessIcon />
        </span>
      )}
    </div>
  );
}
