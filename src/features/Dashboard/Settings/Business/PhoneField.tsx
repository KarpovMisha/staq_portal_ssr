'use client';
import { Form } from 'react-final-form';

import { Button } from '@/ui/elements';
import { FormPhoneInput } from '@/ui/elements/Form';
import EditIcon from '@/ui/icons/edit.svg';
import styles from './Business.module.scss';

export default function PhoneField() {
  function onSubmit(formData) {
    console.log('formData', formData);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.business__form}>
            <FormPhoneInput name="businessPhone" label="Phone" />
            <Button variant="primary" type="submit">
              <EditIcon /> Edit
            </Button>
          </form>
        );
      }}
    />
  );
}
