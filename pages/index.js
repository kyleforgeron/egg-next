import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchEntries, toKebabCase, getComponent } from 'utils';
import { FooterBlock, Layout } from 'components';
import NotFound from './404';

const Home = ({ pages, siteIdentity, page, cards }) => {
  if (!page) return <NotFound {...{ pages, siteIdentity }} />;
  const pageTitle = page[0].title;
  const description = page[0].description;
  const keywords = page[0].keywords;
  return (
    <>
      <Layout
        title="Educators Going Global"
        {...{ description, keywords, pages, siteIdentity }}
      />
      {page[0].components.map(item =>
        getComponent(pageTitle, item, cards, page[0], page[0].metadata),
      )}
      <FooterBlock />
    </>
  );
};

export const getStaticProps = async () => {
  const pages = await fetchEntries({ content_type: 'page', limit: 1000 });
  const siteIdentity = await fetchEntries({
    content_type: 'siteIdentity',
    limit: 1000,
  });
  const page = pages
    .map(p => p.fields)
    .filter(page => toKebabCase(page.title) === 'home-page');
  const cards = await fetchEntries({
    content_type: 'featuretteBlock',
    limit: 1000,
  });

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
