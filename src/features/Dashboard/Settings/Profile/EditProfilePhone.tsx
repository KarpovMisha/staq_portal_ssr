import { Form } from 'react-final-form';

import { Button } from 'elements/index';
import EditIcon from 'styles/icon/dashboard/edit.svg?react';
import { FormPhoneInput } from 'elements/Form';
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
