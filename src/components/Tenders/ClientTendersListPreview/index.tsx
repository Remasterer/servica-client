import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector, useModalState } from '@hooks';
import { useGetAllTendersQuery } from '@services';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { getLeftTime } from '@utils';
import { useRouter } from 'next/router';
import { TenderModal } from '../../Modals';
import { ClientTenderCardPreview } from './ClientTenderCardPreview';

export const ClientTendersListPreview = () => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [openModal, , handleOpenModal, handleCloseModal] = useModalState();

  const router = useRouter();

  const { data: responseData } = useGetAllTendersQuery(
    { user: userId, limit: 2, fields: 'id,title,endDate', sort: '-createdAt' },
    { skip: !userId }
  );

  const clientTenders = responseData?.data.tenders;

  return (
    <Box display="flex" flexDirection="column">
      <Stack mb={2} spacing={1}>
        {clientTenders?.map((clientTender) => {
          const daysLeft = clientTender.endDate && getLeftTime(clientTender.endDate);
          return (
            <ClientTenderCardPreview
              key={clientTender.id}
              id={clientTender.id}
              title={clientTender.title}
              endTime={daysLeft}
            />
          );
        })}
        {(responseData?.results || 0) > 2 && (
          <Button
            size="small"
            endIcon={<ArrowRightAltIcon fontSize="large" />}
            sx={{
              width: 'fit-content',
              alignSelf: 'flex-end',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={() => {
              router.push('/dashboard/posted-tenders').catch((err) => console.error(err));
            }}>
            All my tenders
            <Box
              sx={{
                backgroundColor: 'secondary.main',
                color: 'secondary.contrastText',
                height: '22px',
                width: '22px',
                borderRadius: 3,
                ml: 1.5
              }}>
              {responseData?.results}
            </Box>
          </Button>
        )}
      </Stack>
      <Fab
        color="secondary"
        aria-label="add"
        variant="extended"
        sx={{ width: '190px' }}
        onClick={() => handleOpenModal()}>
        <AddIcon sx={{ mr: 1 }} />
        Add new tender
      </Fab>
      <TenderModal open={openModal} handleCloseDialog={handleCloseModal} />
    </Box>
  );
};
