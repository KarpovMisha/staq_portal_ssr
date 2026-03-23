'use client';
import cn from 'classnames';

import { FormCheckbox, FormInput, FormPhoneInput, FormSelect } from '@/ui/elements/Form';
import { getCountryOptions, ValidatedTextInput } from './FormHelper';
import styles from './ProductionCertificateForm.module.scss';

export default function BusinessRepresentativeStep() {
  return (
    <div className={styles.prod_crt_form}>
      <h1>Business Representative</h1>
      <div className={styles.prod_crt_form__description}>
        We will use this information to verify your identity and keep your account safe. This
        account must be activated by an executive, senior manager or someone who otherwise has
        significant responsibility for the control and management of your business. 
      </div>
      <div className={styles.prod_crt_form__fields}>
        <div className={styles.prod_crt_form__row}>
          <h4>Legal Name</h4>
          {/* <p>The name you provide must exactly match the name associated with your tax ID.</p> */}
          <FormInput name="legalFirstName" placeholder="Legal first name" />
          <FormInput name="legalLastName" placeholder="Legal last name" />
        </div>
        <div className={styles.prod_crt_form__row}>
          <h4>Email Address</h4>
          <FormInput name="businessEmail" placeholder="rami@staq.io" />
        </div>
        <div className={styles.prod_crt_form__row}>
          <h4>Job Title</h4>
          <FormInput name="jobTitle" placeholder="CEO, Manager, Partner..." />
        </div>
        <div className={styles.prod_crt_form__row}>
          <h4>Date of Birth</h4>
          <div className={styles.prod_crt_form__dob}>
            <FormInput name="dobMonth" placeholder="MM" />
            <FormInput name="dobDay" placeholder="DD" />
            <FormInput name="dobYear" placeholder="YYYY" />
          </div>
        </div>
        <div className={styles.prod_crt_form__row}>
          <h4>Home Address</h4>
          <FormSelect name="country" options={getCountryOptions()} isSearchable />
          <ValidatedTextInput placeholder="Street address" name="homeAddress" />
          <ValidatedTextInput placeholder="Appartment, Unit or other" name="homeAddressFloor" />
          <ValidatedTextInput placeholder="State" name="homeAddressCity" />
          <ValidatedTextInput placeholder="City" name="homeAddressState" />
          <ValidatedTextInput placeholder="Zip Code" name="homeAddressZip" />
        </div>
        <div className={styles.prod_crt_form__row}>
          <h4>Phone Number</h4>
          <FormPhoneInput name="phoneNumber" />
        </div>
        <div
          className={cn(
            [styles['prod_crt_form__row']],
            [styles['prod_crt_form__row--ownership']]
          )}
        >
          <h4>Company Ownership</h4>
          <FormCheckbox name="owns25PercentOrMore" label="I own 25% or more of the company." />
          <FormCheckbox
            name="isCompanyDirector"
            label="I'm a director of the company or member of the governing board."
          />
        </div>
      </div>
    </div>
  );
}
