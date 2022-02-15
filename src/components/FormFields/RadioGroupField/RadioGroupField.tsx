import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { cloneElement, FC, ChangeEvent } from 'react';
import { useField } from 'formik';
import { RadioGroupProps, FormHelperText } from '@mui/material';
import { IRadioOptions } from './types';

interface RadioGroupFieldProps {
  options: IRadioOptions[];
  name: string;
  isLabelsHide?: boolean;
}

export const RadioGroupField: FC<RadioGroupFieldProps & RadioGroupProps> = ({
  options,
  name,
  isLabelsHide = null,
  ...props
}) => {
  const [field, meta, helper] = useField(name);
  const { setValue } = helper;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);
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
      <RadioGroup
        {...field}
        {...props}
        onChange={handleChange}
        value={(field?.value as string) || ''}>
        {options.map((option) => {
          const { control } = option;

          let radioButton = null;

          if (!isLabelsHide && option.label) {
            radioButton = (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={option.control || <Radio />}
                label={option.label}
              />
            );
          } else if (!control) {
            radioButton = <Radio key={option.value} value={option.value} />;
          } else if (control) {
            radioButton = cloneElement(control, { key: option.value });
          }
          return radioButton;
        })}
      </RadioGroup>
      {renderHelperText()}
    </>
  );
};

RadioGroupField.defaultProps = {
  isLabelsHide: false
};
