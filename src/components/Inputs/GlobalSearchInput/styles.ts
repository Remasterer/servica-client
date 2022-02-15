import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

export const SearchStyled = styled('div')<{ authenticated: number }>(
  ({ theme, authenticated }) => ({
    position: 'relative',
    border: authenticated ? `1px ${alpha(theme.palette.primary.main, 0.15)} solid` : '#fff',
    borderRadius: '1.2em',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    margin: '0 auto',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  })
);

export const SearchIconWrapperStyled = styled('div')<{ authenticated: number }>(
  ({ theme, authenticated }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: authenticated ? theme.palette.common.black : theme.palette.common.white
  })
);

export const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch'
    }
  }
}));
