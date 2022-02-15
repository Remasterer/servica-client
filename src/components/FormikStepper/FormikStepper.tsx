import { Button, CircularProgress, Grid, Step, StepLabel, Stepper, Box } from '@mui/material';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { useState, Children, ReactElement, FC, CSSProperties } from 'react';
import { AnyObjectSchema } from 'yup';
import { FormikStepProps } from './FormikStep';

type FormikStepperProps = { formStyles?: CSSProperties | undefined } & FormikConfig<FormikValues>;

export const FormikStepper: FC<FormikStepperProps> = ({ children, formStyles, ...props }) => {
  const childrenArray = Children.toArray(children) as ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  const isLastStep = step === childrenArray.length - 1;

  const buttonActionText = isLastStep ? 'Submit' : 'Next';

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema as AnyObjectSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}>
      {({ isSubmitting }) => (
        <Form autoComplete="off" style={formStyles}>
          {currentChild}
          <Box>
            <Grid container spacing={2} mb={2}>
              {step > 0 ? (
                <Grid item>
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    onClick={() => setStep((s) => s - 1)}>
                    Back
                  </Button>
                </Grid>
              ) : null}
              <Grid item>
                <Button
                  startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit">
                  {isSubmitting ? 'Submitting' : buttonActionText}
                </Button>
              </Grid>
            </Grid>
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step key={child.props.label} completed={step > index || completed}>
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

FormikStepper.defaultProps = {
  formStyles: undefined
};
