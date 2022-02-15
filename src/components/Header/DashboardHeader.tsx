import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Box,
} from '@mui/material';
import { GlobalSearchInput } from '@components';
import { HeaderBrand } from './HeaderBrand';
import { HeaderAuthBar } from './HeaderAuthBar';

export const DashboardHeader = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', color: '#000' }} elevation={0}>
      <Box display="flex">
        <HeaderBrand />
        <GlobalSearchInput isAuthenticated />
        <HeaderAuthBar />
      </Box>
    </AppBar>
  );
};
