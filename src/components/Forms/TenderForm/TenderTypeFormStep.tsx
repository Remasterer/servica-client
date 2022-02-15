import { Box, Typography, Button, FormHelperText } from '@mui/material';
import {
  ServicesAutoComplete,
  RadioGroupField,
  TextFormField,
  AutocompleteField
} from '@components';
import { FieldArray, useFormikContext } from 'formik';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { TenderFormValues } from '@models';
import { tenderTypeOptions, workerOptions } from './constants';

export const TenderTypeFormStep = () => {
  const { values } = useFormikContext();

  let content = null;

  if ((values as { type: string }).type === 'workers') {
    content = (
      <>
        <Typography variant="subtitle1" mb={2}>
          Let's define workers types and quantity of them
        </Typography>
        <FieldArray
          name="workers"
          render={({ form, push, remove }) => (
            <Box display="flex" flexDirection="column">
              <Box display="flex" flex="1" mb={2} maxWidth="500px">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Worker type
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} ml="150px">
                  Workers quantity
                </Typography>
              </Box>
              {(form.values as TenderFormValues)?.workers?.map((worker, index: number) => (
                // eslint-disable-next-line
                <Box display="flex" flex="1" mb={2} gap={2} key={index} alignItems="flex-start">
                  <AutocompleteField
                    sx={{ width: '220px' }}
                    name={`workers[${index}].type`}
                    options={workerOptions}
                    getOptionLabel={(option) => (option as { name: string }).name}
                    textFieldProps={{
                      label: 'Type of workers'
                    }}
                    errorPropToDisplay="name"
                  />
                  <TextFormField
                    name={`workers[${index}].quantity`}
                    type="number"
                    label="Workers quantity"
                  />
                  <Button
                    startIcon={<ClearIcon />}
                    variant="contained"
                    sx={{ py: '14px' }}
                    onClick={() => {
                      remove(index);
                    }}>
                    Remove
                  </Button>
                </Box>
              ))}

              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => push({ type: { name: '' }, quantity: '' })}
                sx={{ maxWidth: '220px' }}>
                Add workers
              </Button>
              {typeof form.errors.workers === 'string' && (
                <FormHelperText error>{form.errors.workers}</FormHelperText>
              )}
            </Box>
          )}
        />
      </>
    );
  } else if ((values as { type: string }).type === 'result') {
    content = (
      <>
        <Typography variant="subtitle1" mb={2}>
          Let's add service that we need in this work
        </Typography>
        <ServicesAutoComplete
          id="services-add-tender-create"
          label="Add services for this tender"
          name="services"
        />
      </>
    );
  }

  return (
    <>
      <Box paddingBottom={2}>
        <Typography variant="subtitle1" mb={2}>
          Do you need workers or final result of work?
        </Typography>
        <RadioGroupField
          name="type"
          options={tenderTypeOptions}
          row
          sx={{
            gap: 4,
            mt: 1,
            '& .MuiTypography-root': {
              fontSize: 18
            }
          }}
        />
      </Box>
      <Box py={2}>{content}</Box>
    </>
  );
};
