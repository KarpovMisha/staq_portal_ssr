'use client';
import { Form } from 'react-final-form';

import EditIcon from '@/ui/icons/edit.svg';
import { FormInput } from '@/ui/elements/Form';
import { Button } from '@/ui/elements';
import styles from './Business.module.scss';

export default function EmailField() {

  function onSubmit(formData) {
    console.log('formData', formData);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.business__form}>
            <FormInput name="businessEmail" type="website" label="Website" />
            <Button variant="primary" type="submit">
              <EditIcon /> Edit
            </Button>
          </form>
        );
      }}
    />
  );
}
