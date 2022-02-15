import { TenderFormValues } from '@models';
import { DialogTitle, DialogContent, Dialog } from '@mui/material';
import { useGetTenderQuery } from '@services';
import { FC } from 'react';
import { TenderForm } from '../../Forms/TenderForm';

interface TenderModalProps {
  editMode?: boolean;
  editTenderId?: string | null;
  open: boolean;
  handleCloseDialog(): void;
}

export const TenderModal: FC<TenderModalProps> = ({
  editMode,
  open,
  handleCloseDialog,
  editTenderId
}) => {
  const { data: responseData, isFetching } = useGetTenderQuery(
    {
      id: editTenderId as string,
      fields: '-_id,title,description,price,endDate,type,services,workers'
    },
    {
      skip: !editTenderId
    }
  );

  const tender = responseData?.data.tender;

  const editValues: TenderFormValues | null = tender
    ? {
        title: tender.title || '',
        description: tender.description || '',
        price: tender.price || '',
        endDate: tender.endDate || '',
        type: tender.type || '',
        services: tender.services?.map((title) => ({ title })) || [{ title: '' }],
        workers: tender.workers?.map((worker) => ({
          quantity: worker.quantity,
          type: {
            name: worker.type
          }
        })) || [
          {
            quantity: '',
            type: {
              name: ''
            }
          }
        ]
      }
    : null;

  const handleClose = () => {
    handleCloseDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      sx={{ '.MuiPaper-root': { height: '75vh' } }}>
      <DialogTitle>{editMode ? 'Edit' : 'Create new'} tender</DialogTitle>
      <DialogContent sx={{ display: 'flex' }}>
        {editMode && isFetching ? (
          'Loading'
        ) : (
          <TenderForm
            editMode={editMode}
            editInitialValues={editValues}
            editId={editTenderId}
            actionAfterSubmit={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

TenderModal.defaultProps = {
  editMode: false,
  editTenderId: null
};
