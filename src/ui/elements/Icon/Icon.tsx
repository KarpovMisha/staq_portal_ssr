'use client';

import ArrowRight from '@/ui/icons/arrowRight.svg';
import ArrowDown from '@/ui/icons/downArrow.svg';
import Account from '@/ui/icons/account_gradient.svg';
import Bank from '@/ui/icons/bank_gradient.svg';
import Card from '@/ui/icons/card_gradient.svg';
import Payment from '@/ui/icons/payments_gradient.svg';
import Loan from '@/ui/icons/loans_gradient.svg';
import Auth from '@/ui/icons/auth_gradient.svg';
import App from '@/ui/icons/add_square.svg';
import Certificate from '@/ui/icons/certificates.svg';
import Token from '@/ui/icons/access.svg';
import Change from '@/ui/icons/license-draft.svg';
import Activity from '@/ui/icons/activity.svg';
import Postman from '@/ui/icons/postman.svg';
import Webhooks from '@/ui/icons/webhooks.svg';
import Sdk from '@/ui/icons/sdks.svg';
import Copy from '@/ui/icons/btn-copy.svg';
import Thumb from '@/ui/icons/thumb_up.svg';
import Chang from '@/ui/icons/license-draft.svg';
import Help from '@/ui/icons/help-circle.svg';

const icons = {
  ArrowRight,
  ArrowDown,
  App,
  Account,
  Bank,
  Card,
  Payment,
  Loan,
  Auth,
  Certificate,
  Token,
  Change,
  Activity,
  Postman,
  Webhooks,
  Sdk,
  Copy,
  Thumb,
  Chang,
  Help,
} as const;

export default function Icon({
  name,
  ...props
}: { name: keyof typeof icons } & React.SVGProps<SVGSVGElement>) {
  const Cmp = icons[name];
  return <Cmp {...props} />;
}
