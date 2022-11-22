import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchEntries, toKebabCase, getComponent } from 'utils';
import { FooterBlock, Layout } from 'components';

const Home = ({ pages, siteIdentity, page, cards }) => {
  const pageTitle = page[0].title;
  return (
    <>
      <Layout title="Educators Going Global" {...{ pages, siteIdentity }} />
      {page[0].components.map(item =>
        getComponent(pageTitle, item, cards, page[0].metadata),
      )}
      <FooterBlock />
    </>
  );
};

export const getStaticProps = async () => {
  const pages = await fetchEntries({ content_type: 'page' });
  const siteIdentity = await fetchEntries({ content_type: 'siteIdentity' });
  const page = pages
    .map(p => p.fields)
    .filter(page => toKebabCase(page.title) === 'home-page');
  const cards = await fetchEntries({ content_type: 'featuretteBlock' });

  return {
    props: {
      pages,
      siteIdentity,
      page,
      cards,
    },
  };
};

Home.defaultProps = {
  cards: [],
};

Home.propTypes = {
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
  page: PropTypes.array.isRequired,
  cards: PropTypes.array,
};

export default Home;
