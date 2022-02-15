import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';

export const DashboardMenuItemStyled = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>(({ theme, active }) => ({
  padding: theme.spacing(1.5, 1),
  borderRadius: '1em',
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,

  '& .MuiTypography-root': {
    fontSize: 20
  },

  '& .MuiSvgIcon-root': {
    fontSize: 25,
    color: active && theme.palette.primary.main
  },

  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.09),
    color: theme.palette.primary.main,
    transition: 'all .1s ease',

    '& .MuiListItemIcon-root ': {
      color: theme.palette.primary.main
    }
  }
}));
