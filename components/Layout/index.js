import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { NavBar } from 'components';

const Layout = ({ title, pages, siteIdentity }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar {...{ pages, siteIdentity }} />
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
};

export default Layout;
