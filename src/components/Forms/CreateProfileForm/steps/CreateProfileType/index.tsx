import { FC } from 'react';
import {  RadioGroupField } from '@components';
import { Box } from '@mui/material';
import { FormField } from '../../formModel';
import { profileTypeOptions } from './constants'

export const CreateProfileType: FC<{ formField: FormField }> = ({ formField }) => {
  const { profileType } = formField;
  return (
    <Box>
      <RadioGroupField
        name={profileType.name}
        options={profileTypeOptions}
        row
        sx={{ gap: '8rem', justifyContent: 'center' }}
      />
    </Box>
  );
};
