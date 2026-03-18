'use client';
import { Button } from '@/ui/elements';
import styles from './Profile.module.scss';

export default function DeleteProfile({ id = '3' }: { id?: string }) {

  function handleDelete() {
    // Implement delete profile logic here
    console.log('Delete profile with id:', id);
  }

  return (
    <div className={styles.profile__delete}>
      <h5>Delete your Staq developer account</h5>
      <p>
        Deleting your account will permanently remove your access to the Staq Developer Dashboard,
        all associated applications, keys, and credentials.
      </p>
      <p>Once deleted, this action cannot be undone.</p>
      <div>
        <Button variant="delete" type="submit" onClick={handleDelete}>
          Delete Account
        </Button>
      </div>
    </div>
  );
}
