'use client';
import { Form } from 'react-final-form';
import memoize from 'lru-memoize';


import { Button } from '@/ui/elements';

import { createValidator, required, integer, digitsLength, email } from '@/ui/utils/validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  prodCertificatesActions,
  prodCertificatesActiveStep,
  prodCertificatesActiveSubLabel,
} from '@/store/slices/prodCertificates';
import BusinessDetailsStep from './BusinessDetailsStep';
import styles from './ProductionCertificateForm.module.scss';
import BusinessRepresentativeStep from './BusinessRepresentativeStep';
import BankAccountStep from './BankAccountStep';



export default function ProductionCertificateForm() {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(prodCertificatesActiveStep);
  const activeSubStep = useAppSelector(prodCertificatesActiveSubLabel);

  function onSubmit(formData: any) {
    console.log('formData', formData);
  }

  const validate = memoize(10)(
      createValidator({
      legalBusinessName: [required],
      businessTradingName: [required],
      legalFirstName: [required],
      businessEmail: [required],
      registrationNumber: [required, integer, digitsLength(16)],
      businessWebsite: [required, email],
    })
  );

  return (
    <div className={styles.prod_crt_form}>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={(props: any) => {
          const { handleSubmit, form } = props;

          // validate required fields per sub-step using a map for easy extension
          const requiredFieldsBySub: Record<string, string[]> = {
            'Business Details': ['legalBusinessName', 'businessTradingName'],
            'Business Representative': ['legalFirstName', 'businessEmail'],
          };

          const state = form.getState();
          const errors = state.errors || {};

          const isSubValid = (sub?: string) => {
            const fields = requiredFieldsBySub[sub || ''] || [];
            return fields.every((key) => !(errors && Object.prototype.hasOwnProperty.call(errors, key) && errors[key]));
          };

          const isCurrentSubValid = isSubValid(activeSubStep);

          return (
            <form onSubmit={handleSubmit}>
              {/* Business Information  steps */}
              {activeSubStep === 'Business Details' && <BusinessDetailsStep />}
              {activeSubStep === 'Business Representative' && <BusinessRepresentativeStep />}

              {/* Bank Details steps */}
              {activeSubStep === 'Add Bank Account' && <BankAccountStep />}

              <div className={styles.prod_crt_form__buttons}>
                {activeStep === 'Business Information' && (
                  <Button
                    name="Continue"
                    secondaryClassName="lg"
                    type="button"
                    disabled={!isCurrentSubValid}
                    onClick={() => {
                      if (activeSubStep === 'Business Representative') {
                        dispatch(prodCertificatesActions.setActiveStepByTitle('Bank Details'));
                      } else {
                        dispatch(prodCertificatesActions.advanceSubStep('Business Information'));
                      }
                    }}
                  />
                )}
                <Button
                  name="Save and exit"
                  variant="unstyled"
                  secondaryClassName="lg"
                  type="submit"
                />
              </div>
            </form>
          );
        }}
      />
    </div>
  );
}
