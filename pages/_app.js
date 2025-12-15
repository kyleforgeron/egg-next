import PropTypes from 'prop-types';
import Head from 'next/head';
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
