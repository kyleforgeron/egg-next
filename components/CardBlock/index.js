import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { Podcast, CardTabs } from 'components';
import * as Arrow from 'assets/arrow-narrow-right.svg'
import style from './CardBlock.module.scss';

const CardBlock = ({ cardBlock, cards, pageTitle }) => {
  const home = pageTitle === 'Home Page';
  const [filteredCards, setFilteredCards] = useState(null);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState(home ? 'community' : '');
  useEffect(() => {
    if (!query && !tag && home) return setFilteredCards(null);
    const filteredList = cards.filter(card => {
      if (!home) {
        if (
          !card.metadata.tags.find(
            tagObj => tagObj.sys.id.indexOf(pageTitle.toLowerCase()) > -1,
          )
        )
          return false;
      }
      if (tag) {
        if (
          !card.metadata.tags.find(
            tagObj => {
              return tagObj.sys.id.indexOf(tag) > -1;
            }
          )
        )
          return false;
      }
      if (card.fields.title.toLowerCase().indexOf(query.toLowerCase()) > -1)
        return true;
      if (
        card.fields.shortDescription?.content[0]?.content.filter(
          item => item.value?.toLowerCase().indexOf(query.toLowerCase()) > -1,
        ).length > 0
      )
        return true;
      return false;
    });
    setFilteredCards(home ? filteredList.splice(0, 3) : filteredList);
  }, [cards, query, tag]);

  const cardToHtml = card => (
    <Podcast key={card.sys.id} featuretteBlock={card} />
  );
  const output = !!filteredCards
    ? filteredCards.map(card => cardToHtml(card))
    : cardBlock.fields.cards.map(({ sys }) =>
        cardToHtml(cards.find(item => item.sys.id === sys.id)),
      );
  return (
    <section id={cardBlock.fields.sectionLink} className="section-wrapper">
      <div className="inner">
        <h2>
          {home
            ? 'Browse by topic'
            : `Check out our ${pageTitle} content`}
        </h2>
        <CardTabs {...{ home, tag, setTag, query, setQuery }} />
        <section className={style.cardBlock}>{output}</section>
        {home && (
          <div className={style['cardBlock-more']}>
            <Link href={`/${tag}`}>
              <span className={style['cardBlock-more-button']}>
                <span>{`See all ${tag.charAt(0).toUpperCase() + tag.slice(1)} content`}</span>
                <Image src={Arrow} alt="arrow-right" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

CardBlock.propTypes = {
  cardBlock: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default CardBlock;
