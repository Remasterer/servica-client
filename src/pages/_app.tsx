import { CssBaseline, Box } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Footer } from '@components';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from 'src/theme';
import { wrapper } from '@store';
import { AuthContainer } from 'src/HOC';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        maxWidth: '100vw',
        height: 'auto',
        margin: '0',
        minHeight: '100%'
      }}>
      <Head>
        <title>Servica v.1</title>
        <meta name="description" content="Servica" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <style jsx global>
        {`
          #__next {
            height: 100%;
          }
        `}
      </style>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <AuthContainer>
          <Component {...pageProps} />
        </AuthContainer>
        <Footer />
      </ThemeProvider>
    </Box>
  );
}

export default wrapper.withRedux(MyApp);
