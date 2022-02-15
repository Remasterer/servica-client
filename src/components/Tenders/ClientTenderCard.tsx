import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteTenderMutation } from '@services';
import { SeeAssignersButton } from '@components';

interface ClientTenderCardProps {
  id?: string | null;
  title?: string | null;
  endTime?: string | null;
  price?: number | null;
  description?: string | null;
  handleEdit(_id: string): void;
}

export const ClientTenderCard: FC<ClientTenderCardProps> = ({
  id,
  title,
  endTime,
  price,
  description,
  handleEdit: handleEditTenderItem
}) => {
  const [deleteTender] = useDeleteTenderMutation();

  const handleDeleteTender = async () => {
    if (id) {
      await deleteTender(id);
    }
  };

  const handleEditTender = () => {
    if (id) {
      handleEditTenderItem(id);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5">
          {title}
        </Typography>
        {price && (
          <Box display="flex" alignItems="center">
            <AttachMoneyIcon color="primary" />
            <Typography color="primary" variant="h6" fontWeight="bold">
              {price}
            </Typography>
          </Box>
        )}
        {endTime && (
          <Typography color="secondary" variant="subtitle1" fontSize={17}>
            {endTime} left
          </Typography>
        )}
        {description && (
          <Typography color="text.secondary" mt={1}>
            {description}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        {id && <SeeAssignersButton id={id} />}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={handleEditTender}
            size="medium"
            startIcon={<EditIcon />}
            variant="outlined">
            Edit
          </Button>
          <Button
            onClick={handleDeleteTender}
            size="medium"
            startIcon={<DeleteIcon />}
            variant="outlined">
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

ClientTenderCard.defaultProps = {
  id: null,
  title: null,
  endTime: null,
  price: null,
  description: null
};
