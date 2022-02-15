import { Typography, Box, Button, Stack } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { KeyboardEvent, ReactNode, useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useCreateSpecialistProfileMutation } from 'src/services/specialistService';
import { useRouter } from 'next/router';
import { EProfileType } from '@enums';
import { useCreateClientProfileMutation } from '@services';
import { tryAuthenticateThunk } from '@store';
import { useAppDispatch } from '@hooks';
import { CreateProfileQuantity } from './steps/CreateProfileQuantity';
import { formInitValues, CreateProfileFormValues } from './formInitialValues';
import { formValidation } from './formValidation';
import { formModel } from './formModel';
import { CreateProfileServices } from './steps/CreateProfileServices';
import { CreateProfileExperience } from './steps/CreateProfileExperience';
import { CreateProfileType } from './steps/CreateProfileType';
import { steps } from './constants';

const { formField, formId } = formModel;

const renderStepContent = (stepNumber: number): ReactNode => {
  switch (stepNumber) {
    case 0:
      return <CreateProfileType formField={formField} />;

    case 1:
      return <CreateProfileQuantity formField={formField} />;

    case 2:
      return <CreateProfileServices formField={formField} />;

    case 3:
      return <CreateProfileExperience formField={formField} />;

    default:
      return null;
  }
};

export const CreateProfileForm = () => {
  const [createSpecialistProfile] = useCreateSpecialistProfileMutation();
  const [createClientProfile] = useCreateClientProfileMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [activeStep, setActiveStep] = useState<number>(1);

  const {
    query: { noWorkingProfile }
  } = router;
  const isLastStep = activeStep === steps.length - 1;
  const noProfile = noWorkingProfile === 'true';
  const createProfileSteps = noProfile ? steps : steps.slice(1);
  const currentValidationSchema = formValidation(noProfile)[activeStep];

  useEffect(() => {
    if (noProfile) {
      setActiveStep(0);
    }
  }, [noProfile]);

  const handleSubmit = async (values: CreateProfileFormValues) => {
    try {
      if (activeStep === 0 && values.profileType === EProfileType.CLIENT) {
        await createClientProfile();
        await dispatch(tryAuthenticateThunk());
        router.push('/dashboard').catch((err) => console.log(err));
        return;
      }
      if (!isLastStep) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        return;
      }

      const newProfile = {
        ...values,
        services: values.services.map((service) => service.title)
      };

      await createSpecialistProfile(newProfile);
      await dispatch(tryAuthenticateThunk());
      router.push('/dashboard').catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  return (
    <Box display="flex" flexDirection="column" py={4}>
      <Typography variant="h4" maxWidth="500px" minHeight="100px">
        {steps[activeStep].titleQuestion}
      </Typography>
      <Box sx={{ mt: 2, mb: 6, minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
        <Formik
          initialValues={formInitValues}
          onSubmit={handleSubmit}
          validationSchema={currentValidationSchema}>
          {({ isValid, dirty }) => (
            <Form
              id={formId}
              style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
              onKeyDown={(e) => checkKeyDown(e)}>
              {renderStepContent(activeStep)}
              <Stack direction="row" spacing={5} mt="auto" justifyContent="flex-end">
                {activeStep !== 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '150px' }}
                    onClick={handleBack}>
                    Back
                  </Button>
                )}
                <Button
                  disabled={!(isValid && dirty)}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ width: '150px' }}>
                  {isLastStep ? 'submit' : 'Continue'}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      {activeStep !== 0 && (
        <Stepper activeStep={noProfile ? activeStep : activeStep - 1} alternativeLabel>
          {createProfileSteps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </Box>
  );
};
