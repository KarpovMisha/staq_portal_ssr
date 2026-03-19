'use client';
import { Form } from 'react-final-form';

import { Button } from '@/ui/elements';
import { FormInput } from '@/ui/elements/Form';
import EditIcon from '@/ui/icons/edit.svg';
import styles from './Profile.module.scss';

export default function EditProfilePassword() {

  function onSubmit(formData: any) {
    console.log('formData', formData);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.profile__form}>
            <FormInput name="password" type="password" label="Password" />
            <Button variant="primary" type="submit">
              <EditIcon /> Edit
            </Button>
          </form>
        );
      }}
    />
  );
}
