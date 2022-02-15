import { DashboardHeader } from '@components';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { FC } from 'react';
import { DashboardMenu } from '../../DashboardMenu';
import { ClientTendersListPreview } from '../../Tenders/index';
import { clientMenuItems } from './constants';

export const DashboardClient: FC = ({ children }) => {
  return (
    <Box>
      <Box p={2}>
        <DashboardHeader />
        <Grid container pt={2}>
          <Grid item xs={3}>
            <DashboardMenu menuItems={clientMenuItems} />
          </Grid>
          <Grid item xs={8}>
            {children || (
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" gutterBottom component="div" sx={{ fontWeight: 'medium' }}>
                  My last tenders
                </Typography>
                <Divider light />
                <Box mt={2}>
                  <ClientTendersListPreview />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
