import styles from './TopBarActions.module.scss';
// import SearchIcon from '@/ui/icons/search.svg';
import InfoIcon from '@/ui/icons/circle-help.svg';
import AlertIcon from '@/ui/icons/alert.svg';
import PlusIcon from '@/ui/icons/plus-accordion.svg';

export default function TopBarActions() {
  return (
    <div className={styles.topBarActions}>
      {/* <div>
        <div className={styles.topBarActions__search}>
          <span className={styles.topBarActions__search_icon}>
            <SearchIcon />
          </span>
          <input
            onChange={(e) => console.log(e.target.value)}
            className={styles.topBarActions__input}
            placeholder="Search"
            // value={serchKey}
            autoFocus
          />
        </div>
      </div> */}
      <div className={styles.topBarActions__icon}>
        <InfoIcon />
      </div>
      <div className={styles.topBarActions__icon}>
        <AlertIcon />
      </div>
      <div className={styles.topBarActions__plus}>
        <PlusIcon />
      </div>
    </div>
  );
}
