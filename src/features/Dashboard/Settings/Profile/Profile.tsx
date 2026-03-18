// import { AvatarUploader } from 'components/AvatarUploader/AvatarUploader';
import EditProfileName from './EditProfileName';
import EditProfilePassword from './EditProfilePassword';
import EditProfileEmail from './EditProfileEmail';
import EditProfilePhone from './EditProfilePhone';
import DeleteProfile from './DeleteProfile';
import { AvatarUploader } from '@/ui/components/AvatarUploader/AvatarUploader';
import styles from './Profile.module.scss';

export default function Profile() {
  return (
    <div className={styles.profile}>
      <h4>Profile Settings</h4>
      <AvatarUploader />
      <EditProfileName />
      <EditProfilePassword />
      <EditProfileEmail />
      <EditProfilePhone />
      <DeleteProfile/>
    </div>
  );
}
