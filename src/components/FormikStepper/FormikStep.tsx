import { FormikConfig, FormikValues } from 'formik';

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export const FormikStep = ({ children }: FormikStepProps) => {
  return <div>{children}</div>;
};
