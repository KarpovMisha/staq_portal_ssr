'use client';
import { Form } from 'react-final-form';
import memoize from 'lru-memoize';
// import { useNavigate } from 'react-router';
import cn from 'classnames';


import ArrowIcon from '@/ui/icons/arrowRight.svg';
import InfoIcon from '@/ui/icons/info.svg';
import AccountIcon from '@/ui/icons/account_gradient.svg';
import BankIcon from '@/ui/icons/bank_gradient.svg';
import CardIcon from '@/ui/icons/card_gradient.svg';
import PaymentIcon from '@/ui/icons/payments_gradient.svg';
import LoanIcon from '@/ui/icons/loans_gradient.svg';
import AuthIcon from '@/ui/icons/auth_gradient.svg';
// import { useAppDispatch } from 'hooks/useRedux';
// import { dashboardActions } from '../../../redux/reducers/dashboard';
import { createValidator, required } from '@/ui/utils/validation';
import styles from './CreateApplicationForm.module.scss';
import { Button } from '@/ui/elements';
import { useRouter } from 'next/navigation';
import { FormInput, FormRadio, FormCheckbox } from '@/ui/elements/Form';

const data = [
  {
    title: 'Identity',
    icon: AccountIcon,
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

export default function CreateApplicationForm() {
  // const dispatch = useAppDispatch();
  const router = useRouter();

  function onSubmit(formData) {
    console.log(formData);
    // dispatch(dashboardActions.setActiveModalDetails({ name: 'app created' }))
  }

  const validate = memoize(10)(
    createValidator({
      name: [required],
      type: [required],
      apis_list: [required],
    })
  );

  return (
    <div className={styles.create_app_form}>
      <div
        className={styles.create_app_form__back}
        onClick={() => router.back()}
      >
        <ArrowIcon />
        <span>Back</span>
      </div>
      <h1 className={styles.create_app_form__header}>
        Create a new application
      </h1>
      <div className={styles.create_app_form__description}>
        Set up your new application in just a few steps. Add a name and
        description, choose your configuration type, and select the APIs your
        app will use.
      </div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, values, invalid, submitting }) => {
          let activeApis: string[] = [];
          const activeIteraction = values.iteraction;
          if (
            Array.isArray(values.apis_list) &&
            values.apis_list.every((p) => typeof p === 'string')
          ) {
            activeApis = values.apis_list;
          }
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.create_app_form__steps}>
                <div className={styles.create_app_form__step}>
                  <div className={styles.create_app_form__rail}>
                    <span
                      className={styles.create_app_form__bullet}
                      aria-hidden="true"
                    ></span>
                  </div>
                  <div className={styles.create_app_form__content}>
                    <h4 className={styles.create_app_form__title}>General</h4>
                    <div className={styles.create_app_form__field}>
                      <div>App name</div>
                      <FormInput id="name" name="name" showError={false} />
                      <div>
                        <InfoIcon />
                        Good app name are short, descriptive and memorable
                      </div>
                    </div>
                    <div className={styles.create_app_form__field}>
                      <div>
                        App description <span>Optional</span>
                      </div>
                      <FormInput id="app_description" name="app_description" />
                      <div>
                        <InfoIcon /> Make it easy for collaborators to
                        understand the applications functionality
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.create_app_form__step}>
                  <div className={styles.create_app_form__rail}>
                    <span
                      className={styles.create_app_form__bullet}
                      aria-hidden="true"
                    ></span>
                  </div>

                  <div className={styles.create_app_form__content}>
                    <div className={styles.create_app_form__title}>
                      Configuration
                    </div>
                    <div>
                      <div className={styles.create_app_form__sub_title}>
                        Will this app provide products or services directly to
                        individual customers?
                      </div>
                      <div className={styles.create_app_form__sub_description}>
                        The requirements for integrating api's changes depending
                        on the intended use case.
                      </div>
                      <div
                        className={
                          styles.create_app_form__configuration_buttons
                        }
                      >
                        <div
                          className={cn(
                            styles.create_app_form__configuration_button,
                            {
                              [styles[
                                'create_app_form__configuration_button--active'
                              ]]: activeIteraction === 'yes',
                            },
                          )}
                        >
                          <FormRadio
                            name="type"
                            value="yes"
                            label={
                              <div
                                className={styles.create_app_form__iteraction}
                              >
                                <p>Yes</p>
                                <div>
                                  This app{' '}
                                  <strong className="accent-word">will</strong>{' '}
                                  directly interact with individual <br />
                                  customers.
                                </div>
                              </div>
                            }
                          />
                        </div>
                        <div
                          className={cn(
                            styles.create_app_form__configuration_button,
                            {
                              [styles[
                                'create_app_form__configuration_button--active'
                              ]]: activeIteraction === 'no',
                            },
                          )}
                        >
                          <FormRadio
                            name="type"
                            value="no"
                            label={
                              <div
                                className={styles.create_app_form__iteraction}
                              >
                                <p>No</p>
                                <div>
                                  This app{' '}
                                  <strong className="accent-word">won’t</strong>{' '}
                                  directly interact with individual customers.
                                </div>
                              </div>
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className={styles.create_app_form__sub_title}>
                        What API's will this Application Require?
                      </div>
                      <div className={styles.create_app_form__sub_description}>
                        Select whichever you think are appropriate, this can
                        always be updated later in the app settings
                      </div>
                      <div className={styles.create_app_form__api_list}>
                        {data.map((card) => {
                          const Icon = card.icon;
                          return (
                            <div
                              key={card.title}
                              className={cn(styles.create_app_form__product, {
                                [styles['create_app_form__product--active']]:
                                  activeApis.includes(card.title),
                              })}
                            >
                              <FormCheckbox
                                className="application"
                                name="apis_list"
                                value={card.title}
                                // label={card.title}
                                label={
                                  <div className={styles.create_app_form__label}>
                                    <Icon /> <span>{card.title}</span>
                                  </div>
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.create_app_form__btn}>
                <Button
                  type="submit"
                  variant="gradient_primary"
                  secondaryClassName="lg"
                  disabled={!!invalid || submitting}
                >
                  Create app
                </Button>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
}
