import LogoIcon from '@/ui/icons/staq_app_logo.svg';
import styles from './PageTitle.module.scss';

export default function PageTitle({ title }: { title: string }) {
  return (
    <div className={styles.page_title}>
      <LogoIcon /> <span>{title}</span>
    </div>
  )
}
