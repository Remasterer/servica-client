import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { FC } from 'react';

type TextFormFieldProps = {
  name: string;
} & TextFieldProps;

export const TextFormField: FC<TextFormFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  return (
    <TextField error={touched && !!error} helperText={touched && error} {...field} {...props} />
  );
};
