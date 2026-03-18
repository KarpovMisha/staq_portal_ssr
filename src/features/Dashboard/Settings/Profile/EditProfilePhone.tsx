'use client';
import { Form } from 'react-final-form';

import EditIcon from '@/ui/icons/edit.svg';
import { Button } from '@/ui/elements';
import { FormPhoneInput } from '@/ui/elements/Form';
import styles from './Profile.module.scss';

export default function EditProfilePhone() {
  function onSubmit(formData) {
    console.log('formData', formData);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.profile__form}>
            <FormPhoneInput name="profilePhone" label="Phone" />
            <Button variant="primary" type="submit">
              <EditIcon /> Edit
            </Button>
          </form>
        );
      }}
    />
  );
}
