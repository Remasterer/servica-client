import { Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
// import { RadioGroupField, IRadioOptions, TypeRadioButton } from '@components';
import { useFormikContext } from 'formik';
import { ESpecialistProfileType, EWorkersQuantity } from '@enums';
import { FC } from 'react';
import { TypeRadioButton } from '@components';
import { RadioGroupField, IRadioOptions } from '../../../FormFields/RadioGroupField';
import { FormField } from '../formModel';
import { CreateProfileFormValues } from '../formInitialValues';

interface CreateProfileQuantityProps {
  formField: FormField;
}

const profileTypeOptions: IRadioOptions[] = [
  {
    value: ESpecialistProfileType.MULTIPLE_WORKERS,
    control: (
      <TypeRadioButton
        title="Team"
        icon={<GroupsIcon sx={{ fontSize: '4.9rem' }} />}
        value={ESpecialistProfileType.MULTIPLE_WORKERS}
      />
    )
  },
  {
    value: ESpecialistProfileType.INDIVIDUAL,
    control: (
      <TypeRadioButton
        title="Individual"
        icon={<PersonIcon sx={{ fontSize: '4.9rem' }} />}
        value={ESpecialistProfileType.INDIVIDUAL}
      />
    )
  }
];

const workersSizeOptions: IRadioOptions[] = [
  {
    value: EWorkersQuantity.SMALL,
    label: '1-10'
  },
  {
    value: EWorkersQuantity.MEDIUM,
    label: '10-50'
  },
  {
    value: EWorkersQuantity.LARGE,
    label: '50+'
  }
];

export const CreateProfileQuantity: FC<CreateProfileQuantityProps> = ({ formField }) => {
  const { specialistProfileType, workersNumber } = formField;
  const { values: formValues }: { values: CreateProfileFormValues } = useFormikContext();

  return (
    <Box>
      <RadioGroupField
        name={specialistProfileType.name}
        options={profileTypeOptions}
        row
        sx={{ gap: '8rem', justifyContent: 'center' }}
      />
      {formValues.specialistProfileType === ESpecialistProfileType.MULTIPLE_WORKERS && (
        <Box mt={4}>
          <Typography variant="h5">Specify size of your team</Typography>
          <RadioGroupField
            name={workersNumber.name}
            options={workersSizeOptions}
            row
            sx={{ gap: '8rem' }}
          />
        </Box>
      )}
    </Box>
  );
};
