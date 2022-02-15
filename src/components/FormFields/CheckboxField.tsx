import React, { ChangeEvent, FC, ReactElement } from 'react';
import { useField } from 'formik';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText
} from '@mui/material';

interface CheckboxFieldProps extends FormControlProps {
  name: string;
  label: string | ReactElement<any>;
}

export const CheckboxField: FC<CheckboxFieldProps> = (props) => {
  const { label, name, ...rest } = props;
  const [field, meta, helper] = useField({
    name,
    type: 'checkbox'
  });
  const { setValue } = helper;

  const renderHelperText = () => {
    const { touched, error } = meta;
    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
  };

  return (
    <FormControl {...rest}>
      <FormControlLabel
        value={field.checked}
        checked={field.checked}
        control={<Checkbox {...field} onChange={handleChange} />}
        label={label}
      />
      {renderHelperText()}
    </FormControl>
  );
};
