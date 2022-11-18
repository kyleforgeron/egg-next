import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchEntries, toKebabCase, getComponent } from 'utils';
import { Layout } from 'components';

const Home = ({ pages, siteIdentity, page, cards }) => {
  const [filteredCards, setFilteredCards] = useState(null);
  const onCardSubmit = (e, query) => {
    e.preventDefault();
    if (!query) return setFilteredCards(null);
    const filteredList = cards.filter(card => {
      if (
        card.fields.sectionTitle.toLowerCase().indexOf(query.toLowerCase()) > -1
      )
        return true;
      if (
        card.fields.content.content[0].content[0].value.indexOf(
          query.toLowerCase(),
        ) > -1
      )
        return true;
      if (
        card.metadata.tags.find(
          tag => tag.sys.id.indexOf(query.toLowerCase()) > -1,
        )
      )
        return true;
      return false;
    });
    setFilteredCards(filteredList);
  };
  return (
    <>
      <Layout title="Educators Going Global" {...{ pages, siteIdentity }} />
      {page[0].components.map(item =>
        getComponent(item, cards, filteredCards, onCardSubmit),
      )}
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
