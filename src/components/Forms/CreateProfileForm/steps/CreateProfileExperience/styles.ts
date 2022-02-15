import { IconButton, Box, styled } from '@mui/material';

export const ExperienceBlockStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'success'
})<{ actionBlock?: boolean }>(({ actionBlock, theme }) => ({
  maxWidth: '280px',
  minHeight: '250px',
  display: 'flex',
  flexDirection: 'column',

  alignItems: 'flex-start',
  borderRadius: 5,
  background: theme.palette.secondary.main,
  width: '100%',
  padding: theme.spacing(2),
  color: theme.palette.secondary.contrastText,
  ...(actionBlock && {
    cursor: 'pointer',
    border: `1px dashed ${theme.palette.text.secondary}`,
    background: 'none',
    justifyContent: 'space-between',
    color: theme.palette.common.black
  })
}));

export const AddExperienceButtonStyled = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.main}`,
  '&:hover': {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));
