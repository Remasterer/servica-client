import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import { FC } from 'react';
import { useField } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';

interface SimpleSelectFieldProps {
  id: string;
  label: string;
  options: string[];
  name: string;
  disabled?: boolean;
}

export const SimpleSelectField: FC<SimpleSelectFieldProps> = ({
  id,
  label,
  options,
  name,
  disabled
}) => {
  const [field, meta] = useField(name);

  const { touched, error } = meta;

  const renderHelperText = () => {
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
    <FormControl sx={{ width: '20%' }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        {...field}
        labelId={`${id}-label`}
        id={id}
        label={label}
        error={touched && !!error}
        disabled={disabled}
        sx={{
          '&.Mui-disabled': {
            bgcolor: '#bdbdbd'
          }
        }}>
        {options.map((option: string) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {renderHelperText()}
    </FormControl>
  );
};

SimpleSelectField.defaultProps = {
  disabled: false
};
