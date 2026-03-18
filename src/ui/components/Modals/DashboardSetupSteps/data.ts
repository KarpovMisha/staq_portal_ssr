import AccountIcon from 'styles/icon/dashboard/account_gradient.svg?react';
import BankIcon from 'styles/icon/dashboard/bank_gradient.svg?react';
import CardIcon from 'styles/icon/dashboard/card_gradient.svg?react';
import PaymentIcon from 'styles/icon/dashboard/payments_gradient.svg?react';
import LoanIcon from 'styles/icon/dashboard/loans_gradient.svg?react';
import AuthIcon from 'styles/icon/dashboard/auth_gradient.svg?react';

export const apisList = [
  {
    title: 'Identity',
    icon: AccountIcon,
    // disabled: true,
  },
  {
    title: 'Accounts',
    icon: BankIcon,
  },
  {
    title: 'Cards',
    icon: CardIcon,
  },
  {
    title: 'Payments',
    icon: PaymentIcon,
  },
  {
    title: 'Loans',
    icon: LoanIcon,
  },
  {
    title: 'Authentication',
    icon: AuthIcon,
  },
];
