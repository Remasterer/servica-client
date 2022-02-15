import Dialog from '@mui/material/Dialog';
import { FC } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useGetTenderQuery } from '@services';
import { MakeBidForm } from '@components';

interface MakeBidModalProps {
  open: boolean;
  handleClose(): void;
  tenderId: string;
}

export const MakeBidModal: FC<MakeBidModalProps> = ({ open, handleClose, tenderId }) => {
  const { data: responseData, isFetching } = useGetTenderQuery(
    {
      id: tenderId,
      fields: 'title,description,price,endDate,type,services,workers'
    },
    {
      skip: !tenderId
    }
  );

  const tender = responseData?.data.tender;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Bid tender</DialogTitle>
      <DialogContent>
        {isFetching
          ? 'Loading'
          : tender && <MakeBidForm tender={tender} handleCloseModal={handleClose} />}
      </DialogContent>
    </Dialog>
  );
};
