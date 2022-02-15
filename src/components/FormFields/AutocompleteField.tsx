import { Autocomplete, TextField, AutocompleteProps, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { FC, SyntheticEvent } from 'react';

interface AutocompleteFieldProps
  extends Omit<AutocompleteProps<{ name: string }, false, false, false>, 'renderInput'> {
  name: string;
  textFieldProps: TextFieldProps;
  errorPropToDisplay: string;
}

export const AutocompleteField: FC<AutocompleteFieldProps> = ({
  name,
  textFieldProps,
  errorPropToDisplay,
  ...props
}) => {
  const [field, meta, helper] = useField(name);
  const { setValue, setTouched } = helper;
  const { touched, error } = meta;

  const errorMessage = touched && error && typeof error === 'object' && error[errorPropToDisplay];
  return (
    <Autocomplete
      {...props}
      {...field}
      onChange={(event: SyntheticEvent<Element, Event>, value) => {
        setValue(value);
      }}
      onBlur={() => setTouched(true)}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          error={touched && !!error}
          helperText={errorMessage}
        />
      )}
    />
  );
};
