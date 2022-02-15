import { Paper, styled } from '@mui/material';

export const TypeRadioButtonStyled = styled(Paper)<{ active: number }>(({ theme, active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  borderRadius: 8,
  width: '170px',
  height: '150px',
  position: 'relative',
  background: active ? theme.palette.primary.main : theme.palette.text.secondary,
  transition: 'all .3s ease',
  cursor: 'pointer',
  textAlign: 'center'
}));
