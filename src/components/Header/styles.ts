import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

export const UserBarStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accent'
})<{ accent?: boolean }>(({ theme, accent }) => ({
  border: `1px ${
    accent ? theme.palette.common.white : alpha(theme.palette.primary.main, 0.15)
  } solid`,
  borderRadius: '1em',
  padding: theme.spacing(0.35, 1),
  color: accent ? theme.palette.common.white : theme.palette.common.black
}));

export const HeaderBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'scrollTriggered' && prop !== 'noScrollEffects' && prop !== 'sx'
})<{ scrollTriggered?: boolean; noScrollEffects?: boolean }>(
  ({ theme, scrollTriggered, noScrollEffects }) => ({
    background: noScrollEffects || scrollTriggered ? theme.palette.secondary.main : 'transparent',
    transition: 'background .2s ease'
  })
);
