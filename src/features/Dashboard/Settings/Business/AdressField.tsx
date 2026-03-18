'use client';
import { Form } from 'react-final-form';

import EditIcon from '@/ui/icons/edit.svg';
;
import styles from './Business.module.scss';
import { FormInput } from '@/ui/elements/Form';
import { Button } from '@/ui/elements';

export default function AdressField() {
  function onSubmit(formData) {
    console.log('formData', formData);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.business__form_address}>
            <div>
              <FormInput placeholder="1 Park Avenue" name="businessAddress" />
              <FormInput placeholder="Floor 4" name="businessAddressFloor" />
              <FormInput placeholder="New York" name="businessAddressCity" />
              <FormInput placeholder="New York City" name="businessAddressState" />
            </div>
            <Button variant="primary" type="submit">
              <EditIcon /> Edit
            </Button>
          </form>
        );
      }}
    />
  );
}
