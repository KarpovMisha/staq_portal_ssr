'use client';
import { Form } from 'react-final-form';

import EditIcon from '@/ui/icons/edit.svg';
import { Button } from '@/ui/elements';
import { FormInput } from '@/ui/elements/Form';
import styles from './Profile.module.scss';

export default function EditProfileEmail() {

  function onSubmit(formData: any) {
    console.log('formData', formData);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.profile__form}>
            <FormInput name="email" type="email" label="Email" />
            <Button variant="primary" type="submit">
              <EditIcon /> Edit
            </Button>
          </form>
        );
      }}
    />
  );
}
