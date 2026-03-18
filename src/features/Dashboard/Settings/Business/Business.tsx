import LegalName from './LegalName';
import TradingName from './TradingName';
import RegistrationNumber from './RegistrationNumber';
import TaxNumber from './TaxNumber';
import AdressField from './AdressField';
import PhoneField from './PhoneField';
import EmailField from './EmailField';
import styles from './Business.module.scss';

export default function Business() {
  return (
    <div className={styles.business}>
      <h4>Business settings</h4>
      <LegalName />
      <TradingName />
      <RegistrationNumber />
      <TaxNumber />
      <AdressField />
      <PhoneField />
      <EmailField />
    </div>
  )
}
