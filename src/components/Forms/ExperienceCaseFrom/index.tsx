import { SimpleSelectField, OutlinedInputField } from '@components';
import { Button, DialogActions, DialogContent, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import { FC } from 'react';
import { ExperienceCase } from '../CreateProfileForm/formInitialValues';
import { experienceFormValidation } from '../CreateProfileForm/formValidation';
import { monthNames } from '../constants';
import { generateYears } from './utils';
interface ExperienceCaseFormProps {
  handleSaveExperience: (_values: ExperienceCase) => void;
  handleCloseModal(): void;
}

export const ExperienceCaseForm: FC<ExperienceCaseFormProps> = ({
  handleSaveExperience,
  handleCloseModal
}) => {
  const startYears = generateYears();

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        startYear: '',
        endYear: '',
        startMonth: '',
        endMonth: ''
      }}
      validationSchema={experienceFormValidation}
      onSubmit={(values: ExperienceCase) => {
        handleSaveExperience(values);
        handleCloseModal();
      }}>
      {({ values }) => {
        const yearsEnd = values.startYear ? generateYears(+values.startYear) : [];
        return (
          <Form>
            <DialogContent>
              <Stack spacing={2}>
                <OutlinedInputField id="add-experience-title" inputLabel="Title" name="title" />
                <OutlinedInputField
                  id="add-experience-description"
                  inputLabel="Description"
                  name="description"
                  multiline
                  rows={3}
                />
                <Stack direction="row" spacing={2} justifyContent="space-between">
                  <SimpleSelectField
                    id="year-start-select"
                    label="Start Year"
                    options={startYears}
                    name="startYear"
                  />
                  <SimpleSelectField
                    id="month-start-select"
                    label="Start month"
                    options={monthNames}
                    name="startMonth"
                  />
                  <SimpleSelectField
                    disabled={!values.startMonth}
                    id="month-end-select"
                    label="End month"
                    options={monthNames}
                    name="endMonth"
                  />
                  <SimpleSelectField
                    disabled={!values.startYear}
                    id="year-end-select"
                    label="End Year"
                    options={yearsEnd}
                    name="endYear"
                  />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Form>
        );
      }}
    </Formik>
  );
};
