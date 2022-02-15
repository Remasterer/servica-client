import { Formik, Form, FieldArray } from 'formik';
import { OutlinedInputField, CheckboxField, TextFormField } from '@components';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Tender } from '@models';
import { FC } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useCreateTenderBidMutation } from '@services';
import { makeBidFormValidation } from './validation';
import { TenderBid, TenderBidFormValues } from './types';

interface MakeBidFormProps {
  tender: Tender;
  handleCloseModal(): void;
}

export const MakeBidForm: FC<MakeBidFormProps> = ({ tender, handleCloseModal }) => {
  const [createTenderBid] = useCreateTenderBidMutation();

  const tenderId = tender.id;

  const workers = tender?.workers?.map((worker) => ({
    type: worker.type,
    quantity: '',
    quantityAgree: false,
    neededQuantity: worker.quantity
  }));

  const handleFormSubmit = async (values: TenderBidFormValues) => {
    let newTenderBid: TenderBid = {
      applicationLetter: values.applicationLetter,
      price: values.clientPriceAgree ? (tender.price as number) : values.price
    };

    if (values.workers) {
      newTenderBid.workers = values.workers?.map((worker) => ({
        quantity: worker.quantityAgree ? worker.neededQuantity : (worker.quantity as number),
        type: worker.type
      }));
    }

    await createTenderBid({ id: tenderId, body: newTenderBid });
    handleCloseModal();
  };

  const initialValues: TenderBidFormValues = {
    applicationLetter: '',
    price: '',
    clientPriceAgree: false,
    workers
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={makeBidFormValidation}
      onSubmit={handleFormSubmit}>
      {({ values }) => {
        const offeredWorkersForm = values?.workers;
        return (
          <Form>
            <Stack spacing={2}>
              <Stack spacing={3} mb={2}>
                <CheckboxField
                  name="clientPriceAgree"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                  label={
                    <Typography fontSize={18}>
                      I agree on client price
                      <Typography
                        component="span"
                        color="primary"
                        fontWeight="bold"
                        ml={1}
                        fontSize={18}>
                        ({tender.price}$)
                      </Typography>
                    </Typography>
                  }
                />
                <OutlinedInputField
                  inputLabel="Your price"
                  name="price"
                  type="number"
                  disabled={values.clientPriceAgree}
                  endAdornment={
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  }
                  sx={{ maxWidth: '170px' }}
                />
              </Stack>
              <Divider />
              {workers && workers.length > 0 && (
                <>
                  <Typography variant="h6">This tender need this workers:</Typography>
                  <FieldArray
                    name="workers"
                    render={() => {
                      return (
                        <List>
                          {offeredWorkersForm?.map((worker, index) => (
                            <ListItem key={worker.type} sx={{ maxWidth: '100%' }}>
                              <ListItemIcon
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: 'primary.main',
                                  color: 'primary.contrastText',
                                  borderRadius: '50%',
                                  height: 38,
                                  minWidth: 38
                                }}>
                                <PersonIcon fontSize="medium" />
                              </ListItemIcon>
                              <ListItemText
                                sx={{ wordSpacing: '5px', ml: 2 }}
                                primary={`${worker.neededQuantity} ${worker.type}`}
                              />
                              <CheckboxField
                                name={`workers[${index}].quantityAgree`}
                                label="I can provide"
                              />
                              <Typography fontWeight="medium" mx={2}>
                                or I have
                              </Typography>
                              <TextFormField
                                disabled={offeredWorkersForm[index].quantityAgree}
                                name={`workers[${index}].quantity`}
                                variant="standard"
                                type="number"
                                sx={{ width: 300 }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      );
                    }}
                  />
                </>
              )}
              <OutlinedInputField
                inputLabel="Application letter"
                name="applicationLetter"
                fullWidth
                multiline
                rows={4}
              />
            </Stack>
            <Stack direction="row" spacing={2} mt={2}>
              <Button onClick={handleCloseModal}>Close</Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};
