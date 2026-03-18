import styles from './PageContainer.module.scss';

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className={styles.page_container}>
      {children}
    </div>
  )
}
