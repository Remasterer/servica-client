import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, SvgIcon } from '@mui/material';
import LogoIcon from '@assets/icons/logo.svg';
import { useAppSelector } from '@hooks';
import Link from 'next/link';

export const HeaderBrand = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Link href={user ? '/dashboard' : '/'}>
      <Box display="flex" alignItems="center">
        <SvgIcon
          component={LogoIcon as React.ElementType<any>}
          viewBox="0 0 15 15"
          color="primary"
          sx={{ fontSize: '2rem' }}
        />
        <Typography variant="h6" component="div" marginLeft={1}>
          Servica
        </Typography>
      </Box>
    </Link>
  );
};
