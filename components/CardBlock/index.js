import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Podcast, CardTabs } from 'components';
import style from './CardBlock.module.scss';

const CardBlock = ({ cardBlock, cards }) => {
  const [filteredCards, setFilteredCards] = useState(null);
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (!query) return setFilteredCards(null);
    const filteredList = cards.filter(card => {
      if (
        card.fields.title.toLowerCase().indexOf(query.toLowerCase()) > -1
      )
        return true;
      if (
        card.fields.description.content[1]?.content.filter(item => 
          item.value?.toLowerCase().indexOf(query.toLowerCase()) > -1
        ).length > 0
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
  }, [cards, query]);

  const cardToHtml = card => <Podcast key={card.sys.id} featuretteBlock={card} />;
  const output = !!filteredCards
    ? filteredCards.map(card => cardToHtml(card))
    : cardBlock.fields.cards.map(({ sys }) =>
        cardToHtml(cards.find(item => item.sys.id === sys.id)),
      );
  return (
    <section
      id={cardBlock.fields.sectionLink}
      className="section-wrapper"
    >
      <div className="inner">
        <h2>{cardBlock.fields.sectionTitle}</h2>
        <CardTabs {...{ query, setQuery }} />
        <section className={style.cardBlock}>{output}</section>
      </div>
    </section>
  );
};

CardBlock.defaultProps = {
  filteredCards: [],
};

CardBlock.propTypes = {
  cardBlock: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  filteredCards: PropTypes.array,
  onCardSubmit: PropTypes.func.isRequired,
};

export default CardBlock;
