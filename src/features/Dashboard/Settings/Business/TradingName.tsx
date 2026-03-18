'use client';
import { Form } from 'react-final-form';

import EditIcon from '@/ui/icons/edit.svg';
import styles from './Business.module.scss';
import { FormInput } from '@/ui/elements/Form';
import { Button } from '@/ui/elements';

export default function TradingName() {

  function onSubmit(formData) {
    console.log('formData', formData);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.business__form}>
            <FormInput name="name" label="Trading Name" />
            <Button variant="primary" type="submit">
              <EditIcon /> Edit
            </Button>
          </form>
        );
      }}
    />
  );
}
