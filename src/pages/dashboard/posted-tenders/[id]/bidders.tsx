import { Typography, Divider } from '@mui/material';
import { useGetTenderBiddersQuery } from '@services';
import { useRouter } from 'next/router';
import DashboardPage from '../..';

const AssignersPage = () => {
  const router = useRouter();
  const { id } = router.query;
  useGetTenderBiddersQuery({ id: id as string });
  return (
    <DashboardPage>
      <Typography variant="h5" gutterBottom component="div" sx={{ fontWeight: 'medium' }}>
        Let's see who wants to work with you
      </Typography>
      <Divider light />
    </DashboardPage>
  );
};

export default AssignersPage;
