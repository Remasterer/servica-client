import { Typography, Box, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC, useCallback } from 'react';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useModalState } from '@hooks';
import { AddExperienceModal } from '../../../../Modals';
import { FormField } from '../../formModel';
import { ExperienceCase, CreateProfileFormValues } from '../../formInitialValues';
import { AddExperienceButtonStyled, ExperienceBlockStyled } from './styles';
import { monthNames } from '../../../constants';

const AddExperienceCaseFields: FC<FieldArrayRenderProps | void> = (props) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push, remove, form } = props as FieldArrayRenderProps;

  const [openModal, , handleOpenModal, handleCloseModal] = useModalState();

  const {
    values: { experienceCases }
  } = form as { values: CreateProfileFormValues };

  const handlePushExperienceCase = useCallback(
    (newValues: ExperienceCase) => {
      const newExpCase: {
        title: string;
        description: string;
        startDate?: string;
        endDate?: string;
      } = {
        title: newValues.title,
        description: newValues.description
      };
      const { startYear, startMonth, endMonth, endYear } = newValues;

      let startDate = null;
      let endDate = null;

      if (startYear && startMonth && endMonth && endYear) {
        const startMonthNumber = monthNames.findIndex((month) => month === startMonth) + 1;
        const endMonthNumber = monthNames.findIndex((month) => month === endMonth) + 1;
        startDate = dayjs()
          .month(startMonthNumber)
          .year(+startYear);
        endDate = dayjs()
          .month(endMonthNumber)
          .year(+endYear);

        newExpCase.startDate = startDate.toString();
        newExpCase.endDate = endDate.toString();
      }

      push(newExpCase);
    },
    [push]
  );

  const handleRemoveItem = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  return (
    <>
      <Stack direction="row" spacing={2}>
        {experienceCases.map((experienceCase: ExperienceCase, index: number) => {
          let id = uuidv4();
          return (
            <ExperienceBlockStyled key={id}>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                sx={{
                  alignItems: 'center',
                  maxWidth: '90%'
                }}>
                <WorkIcon />
                <Typography
                  mt={2}
                  variant="h5"
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                  }}>
                  {experienceCase.title}
                </Typography>
              </Stack>
              <Box>
                <Typography variant="body2" mt={4}>
                  {experienceCase.description}
                </Typography>
              </Box>

              <Stack mt="auto">
                <Button
                  startIcon={<DeleteIcon />}
                  color="inherit"
                  onClick={() => handleRemoveItem(index)}>
                  Delete item
                </Button>
              </Stack>
            </ExperienceBlockStyled>
          );
        })}
        <ExperienceBlockStyled actionBlock p={2} onClick={() => handleOpenModal()}>
          <Typography variant="h5">Add new experience</Typography>
          <AddExperienceButtonStyled color="secondary" size="large">
            <AddIcon />
          </AddExperienceButtonStyled>
        </ExperienceBlockStyled>
      </Stack>
      <AddExperienceModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        handleSaveExperience={handlePushExperienceCase}
      />
    </>
  );
};

interface CreateProfileExperienceProps {
  formField: FormField;
}

export const CreateProfileExperience: FC<CreateProfileExperienceProps> = ({ formField }) => {
  const { experienceCases } = formField;
  return (
    <Box>
      <FieldArray name={experienceCases.name} component={AddExperienceCaseFields} />
    </Box>
  );
};
