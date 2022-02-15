import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { ServicesAutoComplete } from '@components';
import { FormField } from '../formModel';

interface CreateProfileServicesProps {
  formField: FormField;
}

export const CreateProfileServices: FC<CreateProfileServicesProps> = ({ formField }) => {
  const { services } = formField;

  return (
    <Box width="100%">
      <Typography my={2} variant="subtitle2">
        You can search for the service you prove and check it , or create new with pressing enter.
      </Typography>
      <ServicesAutoComplete
        id="add-service-profile-create"
        label="Add service in which you have competence"
        name={services.name}
      />
    </Box>
  );
};
