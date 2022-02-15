import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { ServiceOptionType } from '@models';
import { useField } from 'formik';
import { checkedIcon, filter, icon, servicesOptions } from './constants';

interface ServicesAutoCompleteProps {
  name: string;
  id: string;
  label: string;
}

export const ServicesAutoComplete: FC<ServicesAutoCompleteProps> = ({ name, id, label }) => {
  const [field, meta, helper] = useField(name);
  const { setValue } = helper;
  const { value: servicesSelectValues } = field as { value: ServiceOptionType[] };
  const { touched, error } = meta;

  return (
    <div>
      <Autocomplete
        id={id}
        value={servicesSelectValues}
        onChange={(event, newValues) => {
          setValue(newValues);
        }}
        options={servicesOptions}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }

          return option.title;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!(touched && error)}
            helperText={touched && error}
            onKeyDown={(e) => {
              if (e.code === 'Enter' && (e.target as HTMLInputElement).value) {
                setValue(
                  servicesSelectValues?.concat({ title: (e.target as HTMLInputElement)?.value })
                );
              }
            }}
            label={label}
          />
        )}
        renderOption={(props, option: ServiceOptionType) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <li {...props}>
            {!option.title.startsWith('Add') && (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={
                  servicesSelectValues?.findIndex(
                    (service: ServiceOptionType) => service.title === option.title
                  ) !== -1 || false
                }
              />
            )}
            {option.title}
          </li>
        )}
        fullWidth
        multiple
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`
            });
          }

          return filtered;
        }}
        selectOnFocus
        disableCloseOnSelect
        clearOnBlur
        handleHomeEndKeys
        groupBy={(option) => option?.serviceCategory || ''}
      />
    </div>
  );
};
