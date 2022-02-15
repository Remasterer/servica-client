import { Box, InputAdornment, OutlinedInput, InputLabel } from '@mui/material';
import { FormikStepper, FormikStep, OutlinedInputField, DatePickerField } from '@components';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useCreateTenderMutation, useUpdateTenderMutation } from '@services';
import { TenderFormValues } from '@models';
import { FormikValues } from 'formik';
import omitBy from 'lodash/omitBy';
import { FC } from 'react';
import { detailsValidation, generalInfoValidation, typesValidation } from './validation';
import { TenderTypeFormStep } from './TenderTypeFormStep';

interface TenderFormProps {
  editMode?: boolean;
  editId?: string | null;
  editInitialValues?: TenderFormValues | null;
  actionAfterSubmit(): void;
}

const defaultInitialValues: TenderFormValues = {
  title: '',
  description: '',
  price: '',
  endDate: '',
  type: '',
  services: [{ title: '' }],
  workers: [
    {
      quantity: '',
      type: {
        name: ''
      }
    }
  ]
};

export const TenderForm: FC<TenderFormProps> = ({
  editMode,
  editInitialValues,
  editId,
  actionAfterSubmit
}) => {
  const [createTender] = useCreateTenderMutation();
  const [updateTender] = useUpdateTenderMutation();

  const handleTenderFormSubmit = async (formValues: FormikValues) => {
    const values = formValues as TenderFormValues;
    let newTender = {
      ...values,
      services: values.services?.map((service) => service.title),
      workers: values.workers?.map((worker) => ({
        quantity: worker.quantity,
        type: worker.type.name
      }))
    };

    let newCleanTender = omitBy(newTender, (val) => val === '');

    if (editMode) {
      if (editId) {
        await updateTender({ id: editId, body: newCleanTender });
      }
    } else {
      await createTender(newCleanTender);
    }
    actionAfterSubmit();
  };

  return (
    <FormikStepper
      formStyles={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}
      initialValues={editMode && editInitialValues ? editInitialValues : defaultInitialValues}
      onSubmit={handleTenderFormSubmit}>
      <FormikStep label="General info" validationSchema={generalInfoValidation}>
        <Box paddingBottom={2}>
          <OutlinedInputField id="add-tender-title" inputLabel="Title" name="title" fullWidth />
        </Box>
        <Box paddingBottom={2}>
          <OutlinedInputField
            id="add-tender-description"
            inputLabel="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
          />
        </Box>
      </FormikStep>
      <FormikStep label="Tender details" validationSchema={detailsValidation}>
        <Box paddingBottom={2}>
          <OutlinedInputField
            id="add-tender-price"
            inputLabel="Approximate price"
            name="price"
            fullWidth
            type="number"
            startAdornment={
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            }
          />
        </Box>
        <Box paddingBottom={2}>
          <InputLabel shrink htmlFor="add-tender-endDate">
            End date of tender , by which specialists can assign
          </InputLabel>
          <DatePickerField
            id="add-tender-endDate"
            name="endDate"
            isClearable
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            showTimeSelect
            customInput={
              <OutlinedInput
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                }
              />
            }
          />
        </Box>
      </FormikStep>
      <FormikStep label="Type of tender" validationSchema={typesValidation}>
        <TenderTypeFormStep />
      </FormikStep>
    </FormikStepper>
  );
};

TenderForm.defaultProps = {
  editMode: false,
  editInitialValues: null,
  editId: null
};
