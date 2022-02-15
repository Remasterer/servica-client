import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import { IconButton } from '@mui/material';

export const DashboardMenuContainerStyled = styled(Paper)(({ theme }) => ({
  height: '100%',
  paddingTop: theme.spacing(5),
  paddingLeft: theme.spacing(3),
  position: 'relative',
  borderRadius: '0 44px 44px 0',
  paddingRight: theme.spacing(2)
}));

export const DashboardMapStyled = styled(Paper)(() => ({
  height: '100%',
  marginLeft: '-34px'
}));

export const ExpansionButtonStyled = styled(IconButton)(({ theme }) => ({
  background: alpha(theme.palette.common.black, 0.07),
  position: 'absolute',
  right: '15px',
  bottom: '15px'
}));
