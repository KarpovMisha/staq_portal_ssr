'use client';
import { FormInput, FormNumberInput, FormPhoneInput, FormSelect } from '@/ui/elements/Form';
import { ValidatedTextInput, ValidatedNumberInput, getCountryOptions } from './FormHelper';
import styles from './ProductionCertificateForm.module.scss';

export default function BusinessDetailsStep() {

  return (
    <div className={styles.prod_crt_form}>
      <h1>Business Details</h1>
      <div className={styles.prod_crt_form__description}>
        This information is collected to better serve your business and comply with regulators and
        financial partners, as indicated in the Terms of Service.
      </div>
      <div className={styles.prod_crt_form__fields}>
        <div className={styles.prod_crt_form__row}>
          <h4>Legal Business Name</h4>
          <p>The name you provide must exactly match the name associated with your tax ID.</p>
          <ValidatedTextInput name="legalBusinessName" />
        </div>
        <div className={styles.prod_crt_form__row}>
          <h4>Business Trading Name</h4>
          <p>The operating name of your company, if it’s different than the legal name.</p>
          <ValidatedTextInput name="businessTradingName" />
        </div>
        <div className={styles.prod_crt_form__row}>
          <h4>Registration Number</h4>
          <p>Your 16 digit company number.</p>
          <ValidatedNumberInput name="registrationNumber" format="group" />
        </div>
        <div className={styles.prod_crt_form__row}>
          <h4>Tax Number</h4>
          <p>Your 32 digit Tax number.</p>
          <ValidatedNumberInput name="taxNumber" format="group" />
        </div>

        <div className={styles.prod_crt_form__row}>
          <h4>Business Address</h4>
          <p>This address must match the address filed with the IRS tax authority</p>
          <FormSelect name="country" options={getCountryOptions()} isSearchable />
          <ValidatedTextInput placeholder="1 Park Avenue" name="businessAddress" />
          <ValidatedTextInput placeholder="Floor 4" name="businessAddressFloor" />
          <ValidatedTextInput placeholder="New York" name="businessAddressCity" />
          <ValidatedTextInput placeholder="New York City" name="businessAddressState" />
          <ValidatedTextInput placeholder="90210" name="businessAddressZip" />
        </div>

        <div className={styles.prod_crt_form__row}>
          <h4>Business Phone Number</h4>
          <FormPhoneInput
            name="businessPhoneNumber"
          />
        </div>
        <div className={styles.prod_crt_form__row}>
          <h4>Business Website</h4>
          <p>Website must be viewable and not password protected and it must match either the business trading name or legal name.</p>
          <ValidatedTextInput placeholder="www.example.com" name="businessWebsite" />
        </div>
      </div>
    </div>
  );
}
