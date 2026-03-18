'use client';
import { Form } from 'react-final-form';

import { FormNumberInput } from '@/ui/elements/Form';
import styles from './Business.module.scss';

export default function RegistrationNumber() {
  return (
    <Form
      onSubmit={() => {}}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.business__form}>
            <FormNumberInput
              placeholder="1243 5648 0045 7890 1243 5648 0045 7890"
              name="registrationNumber"
              format="group"
              label="Registration Number"
            />
          </form>
        );
      }}
    />
  );
}
