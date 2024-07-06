import PropTypes from 'prop-types';
import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';
import 'styles/main.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Educators Going Global</title>
        <link rel="icon" type="image/png" href={'images/favicon.png'} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>
      <div>
        <Component {...pageProps} />
        <GoogleAnalytics gaId="G-FSCTTWLYG3" />
      </div>
    </>
  );
};

MyApp.defaultProps = {
  pageProps: {},
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
