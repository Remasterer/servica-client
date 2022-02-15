import {
  FormControl,
  OutlinedInputProps as MuiOutlinedInputProps,
  FormHelperText
} from '@mui/material';
import { useField } from 'formik';
import { FC, ReactNode } from 'react';
import { DefaultInput } from '../Inputs/DefaultInput';

interface OutlinedInputProps extends MuiOutlinedInputProps {
  name: string;
  inputLabel: string;
}

export const OutlinedInputField: FC<OutlinedInputProps> = ({ name, inputLabel, ...props }) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  const renderHelperText = (): ReactNode => {
    if (touched && error) {
      return error && <FormHelperText error={!!error}>{error}</FormHelperText>;
    }
    return null;
  };

  return (
    <FormControl variant="standard" fullWidth={props.fullWidth}>
      <DefaultInput
        {...field}
        {...props}
        inputLabel={inputLabel}
        error={touched && !!error && true}
        sx={{
          '&.Mui-disabled': {
            background: '#bdbdbd'
          }
        }}
      />
      {renderHelperText()}
    </FormControl>
  );
};
