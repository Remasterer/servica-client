import { createTheme, ThemeOptions, responsiveFontSizes } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#023e8a',
      contrastText: '#fff',
      light: 'rgba(24, 78, 119, .3)'
    },
    secondary: {
      main: '#ff9100',
      contrastText: '#fff'
    },
    common: {
      black: '#000'
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%'
        },
        body: {
          position: 'relative',
          height: '100%'
        }
      }
    }
  }
};

export const customTheme = responsiveFontSizes(createTheme(themeOptions));
