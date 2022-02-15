import { useGetTenderQuery } from '@services';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import GavelIcon from '@mui/icons-material/Gavel';
import { TagsWorkers, TagsServices, MakeBidModal } from '@components';
import Link from 'next/link';
import { useModalState } from '@hooks';
import DashboardPage from '..';

const TenderSpecialistPage = () => {
  const [openModal, , handleOpenModal, handleCloseModal] = useModalState();
  const router = useRouter();
  const { id } = router.query;

  const { data: responseData } = useGetTenderQuery({ id: id as string }, { skip: !id });

  const tender = responseData?.data.tender;

  return (
    <DashboardPage>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="medium">
          {tender?.title}
        </Typography>
        {tender?.price && (
          <Typography variant="h6" color="primary" fontWeight="bold">
            Price: {tender?.price} $
          </Typography>
        )}
      </Stack>
      <Divider />
      <Box my={4} display="flex" justifyContent="space-between" alignItems="center">
        <Stack spacing={1}>
          <Link href={`/dashboard/profile/${tender?.user?.id || ''}`}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar>{tender?.user?.username.slice(0, 1)}</Avatar>
              <Typography>{tender?.user?.username}</Typography>
            </Stack>
          </Link>
          <Rating name="read-only" value={3} readOnly />
        </Stack>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{ width: '200px', borderRadius: 3 }}
          startIcon={<GavelIcon />}
          onClick={() => handleOpenModal()}>
          Make a bid
        </Button>
      </Box>
      {tender?.description && (
        <Typography variant="body1" color="text.secondary" mb={4}>
          {tender?.description}
        </Typography>
      )}
      {tender?.workers && tender.workers.length > 0 && (
        <Box mb={4}>
          <Typography variant="subtitle1" mb={1} fontWeight="medium">
            Workers in need
          </Typography>
          <TagsWorkers items={tender?.workers} />
        </Box>
      )}
      {tender?.services && tender.services.length > 0 && (
        <Box mb={4}>
          <Typography variant="subtitle1" mb={1} fontWeight="medium">
            Services in need
          </Typography>
          <TagsServices items={tender?.services} />
        </Box>
      )}
      <MakeBidModal open={openModal} handleClose={handleCloseModal} tenderId={id as string} />
    </DashboardPage>
  );
};

export default TenderSpecialistPage;
