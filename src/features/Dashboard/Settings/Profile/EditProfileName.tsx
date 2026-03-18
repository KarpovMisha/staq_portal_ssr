'use client';
import { Form } from 'react-final-form';

import EditIcon from '@/ui/icons/edit.svg';
import { Button } from '@/ui/elements';
import { FormInput } from '@/ui/elements/Form';
import styles from './Profile.module.scss';

export default function EditProfileName() {

  function onSubmit(formData) {
    console.log('formData', formData);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.profile__form}>
            <FormInput name="name" label="Name" />
            <Button variant="primary" type="submit">
              <EditIcon /> Edit
            </Button>
          </form>
        );
      }}
    />
  );
}
