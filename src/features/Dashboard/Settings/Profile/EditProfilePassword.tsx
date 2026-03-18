import { Form } from 'react-final-form';

import { Button } from 'elements/index';
import EditIcon from 'styles/icon/dashboard/edit.svg?react';
import { FormInput } from 'elements/Form';
import styles from './Profile.module.scss';

export default function EditProfilePassword() {

  function onSubmit(formData) {
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
