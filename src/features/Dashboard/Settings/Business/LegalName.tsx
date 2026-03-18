'use client';
import { Form } from 'react-final-form';

import { FormInput } from '@/ui/elements/Form';
import styles from './Business.module.scss';

export default function LegalName() {

  return (
    <Form
      onSubmit={() => {}}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.profile__form}>
            <FormInput name="name" label="Legal Name" />
          </form>
        );
      }}
    />
  );
}
