import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useField } from 'formik';
import { FC } from 'react';
import { FormHelperText } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerFieldProps extends Partial<ReactDatePickerProps> {
  name: string;
}

export const DatePickerField: FC<DatePickerFieldProps> = ({ name, ...props }) => {
  const [field, meta, helper] = useField(name);
  const { setValue } = helper;

  const handleChange = (value: Date) => {
    setValue(value);
  };

  const renderHelperText = () => {
    const { touched, error } = meta;
    if (touched && error) {
      return (
        <FormHelperText error sx={{ my: 2, fontSize: 18 }}>
          {error}
        </FormHelperText>
      );
    }
    return null;
  };

  return (
    <>
      <DatePicker
        {...field}
        {...props}
        selected={((field.value as Date) && new Date(field.value as Date)) || null}
        onChange={handleChange}
      />
      {renderHelperText()}
    </>
  );
};
