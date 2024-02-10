import PropTypes from 'prop-types';
import Head from 'next/head';
import { NavBar } from 'components';

const Layout = ({ title, description, keywords, pages, siteIdentity }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description ?? 'Educators Going Global'}
        />
        <meta
          name="keywords"
          content={
            keywords ??
            'international teaching, international education, international teacher recruiting, international teacher recruitment, expat, expat teacher, teacher finances, travel while you teach, travel teaching'
          }
        />
      </Head>
      <NavBar {...{ pages, siteIdentity }} />
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string,
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
};

export default Layout;
