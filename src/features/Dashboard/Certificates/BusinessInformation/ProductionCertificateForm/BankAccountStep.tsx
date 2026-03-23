'use client';
import { FormCheckbox, FormNumberInput, FormSelect } from '@/ui/elements/Form';
import { getCountryOptions } from './FormHelper';
import styles from './ProductionCertificateForm.module.scss';


export default function BankAccountStep() {
  return (
    <div className={styles.prod_crt_form}>
      <h1>Add Bank Account</h1>
      <div className={styles.prod_crt_form__description}>
        Enter your business bank information to receive payments directly to your account. Make sure
        the details match your registered business bank account.
      </div>
      <div className={styles.prod_crt_form__fields}>
        <div className={styles.prod_crt_form__row}>
          <FormSelect label="Currency" name="currency" options={getCountryOptions()} isSearchable />
        </div>
        <div className={styles.prod_crt_form__row}>
          <FormSelect
            label="Bank Location"
            name="bankLocation"
            options={getCountryOptions()}
            isSearchable
          />
        </div>
        <div className={styles.prod_crt_form__row}>
          <FormNumberInput name="routingNumber" placeholder="901100" label="Routing number" />
        </div>
        <div className={styles.prod_crt_form__row}>
          <FormNumberInput name="accountNumber" placeholder="123456789" label="Account number" />
        </div>
        <div className={styles.prod_crt_form__row}>
          <FormSelect
            label="Account type"
            name="accountType"
            options={[
              { value: 'B2B', label: 'B2B' },
              { value: 'B2C', label: 'B2C' },
            ]}
          />
        </div>
      </div>
      <div className={styles.prod_crt_form__row}>
        <h4>Authorization</h4>
        <FormCheckbox
          name="authorizesBankAccount"
          label="I certify that I am the account holder or have been duly authorized by the account holder to provide and manage these bank account details. "
        />
      </div>
    </div>
  );
}
