import { useState } from 'react';
// import { Form } from 'react-final-form';

// import ArrowIcon from 'styles/icon/arrowRight.svg?react';
// import CompanyDetails from './DashboardSetupSteps/CompanyDetails';
// import CompanyName from './DashboardSetupSteps/CompanyName';
// import CompanyTypes from './DashboardSetupSteps/CompanyTypes';
// import CompanyApis from './DashboardSetupSteps/CompanyApis';
import styles from './DashboardSetup.module.scss';
// import ModalBackdrop from 'elements/ModalBackdrop/ModalBackdrop';

export enum SetupStep {
  COMPANY_NAME = 'companyName',
  COMPANY_TYPES = 'companyTypes',
  COMPANY_APIS = 'companyApis',
}

export default function DashboardSetup() {
  const steps = Object.values(SetupStep);
  const [currentStep, setCurrentStep] = useState<SetupStep>(SetupStep.COMPANY_NAME);

  // const currentIndex = steps.indexOf(currentStep);

  // const nextStep = () => {
  //   if (currentIndex < steps.length - 1) {
  //     setCurrentStep(steps[currentIndex + 1]);
  //   }
  // };

  // const prevStep = () => {
  //   if (currentIndex > 0) {
  //     setCurrentStep(steps[currentIndex - 1]);
  //   }
  // };

  // function onSubmit(formData) {
  //   console.log('formData', formData);
  // }

  return (
    <ModalBackdrop>
      <div className={styles.dashboard_setup}>
        {/* <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, values }) => {
            console.log(values);
            return (
              <form onSubmit={handleSubmit}>
                <div className={styles.dashboard_setup__settings}>
                  <div className={styles.dashboard_setup__steps}>
                    <div className={styles.dashboard_setup__header}>
                      {currentStep === SetupStep.COMPANY_NAME ? (
                        'Setup your dashboard'
                      ) : (
                        <div className={styles.dashboard_setup__back} onClick={prevStep}>
                          <ArrowIcon />
                          <span>Back</span>
                        </div>
                      )}
                    </div>
                    {currentStep === SetupStep.COMPANY_NAME && (
                      <CompanyName nextStep={nextStep} isValid={!values.business_name} />
                    )}
                    {currentStep === SetupStep.COMPANY_TYPES && (
                      <CompanyTypes nextStep={nextStep} types={values.company_types} />
                    )}
                    {currentStep === SetupStep.COMPANY_APIS && (
                      <CompanyApis nextStep={nextStep} apis={values.company_apis} />
                    )}
                  </div>

                  <CompanyDetails step={currentStep} data={values} />
                </div>
              </form>
            );
          }}
        /> */}
      </div>
    </ModalBackdrop>
  );
}
