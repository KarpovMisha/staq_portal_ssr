'use client';
import copy from 'copy-to-clipboard';

import { Icon } from '../../elements';
import styles from './InlineCodeBlock.module.scss';
import { showSuccess } from '../Toasts/Toast';
// import { showSuccess } from 'elements/Toasts/toastActions';

export default function InlineCodeBlock({ code }: { code: string }) {
  return (
    <div className={styles.inline_code}>
      <div>{code}</div>
      <div
        onClick={() => {
          copy(code);
          showSuccess('Copied to clipboard');
        }}
      >
        <Icon name='Copy' />
      </div>
    </div>
  );
}
