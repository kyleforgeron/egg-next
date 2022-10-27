import PropTypes from 'prop-types';
import Head from 'next/head';
import 'styles/main.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Triad x Next.js</title>
        <meta
          name="description"
          content="Triad Template using Next.js for SSG and SSR"
        />
        <link rel="icon" type="image/png" href={'images/favicon.png'} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>
      <div className="page-wrapper">
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
