import { NextPage } from 'next';
import { Box, Typography, Divider } from '@mui/material';
import { SpecialistTenderList } from '@components';
import { withAuthGuard } from '../../../HOC';
import DashboardPage from '../index';

const TendersPage: NextPage = () => {
  return (
    <DashboardPage>
      <Box display="flex" flexDirection="column" gap="10px" pt={2}>
        <Typography variant="h5" gutterBottom component="div" sx={{ fontWeight: 'medium' }}>
          Best tenders which fits you
        </Typography>
        <Divider light />
        <SpecialistTenderList />
      </Box>
    </DashboardPage>
  );
};

export default withAuthGuard(TendersPage, true, false, true);
