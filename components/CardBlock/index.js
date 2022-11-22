import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardTabs } from 'components';
import { toKebabCase } from 'utils';
import * as Arrow from 'assets/arrow-narrow-right.svg';
import { getButtonTitle } from './constants';
import style from './CardBlock.module.scss';

const CardBlock = ({ cardBlock, cards, pageTitle }) => {
  const home = pageTitle === 'Home Page';
  const categoryPage = [
    'Home Page',
    'Blog',
    'Podcast',
    'Library Resources',
    'EGG Stories',
  ].includes(pageTitle);
  const [filteredCards, setFilteredCards] = useState(null);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState(home ? 'schoolLife' : '');

  useEffect(() => {
    if (!query && !tag && home) return setFilteredCards(null);
    const filteredList = cards.filter(card => {
      if (!home) {
        if (
          !card.metadata.tags.find(tagObj => {
            /*console.log(
              toKebabCase(tagObj.sys.id),
              toKebabCase(pageTitle.toLowerCase()),
              toKebabCase(tagObj.sys.id).indexOf(
                toKebabCase(pageTitle.toLowerCase()),
              ) > -1,
            );*/
            return (
              tagObj.sys.id.indexOf(pageTitle.toLowerCase()) > -1 ||
              toKebabCase(tagObj.sys.id).indexOf(
                toKebabCase(pageTitle.toLowerCase()),
              ) > -1 ||
              toKebabCase(pageTitle.toLowerCase()).indexOf(
                toKebabCase(tagObj.sys.id),
              ) > -1
            );
          })
        )
          return false;
      }
      if (tag) {
        if (
          !card.metadata.tags.find(tagObj => {
            return tagObj.sys.id.indexOf(tag) > -1;
          })
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

  const cardToHtml = card => <Card key={card.sys.id} featuretteBlock={card} />;
  const output = !!filteredCards
    ? filteredCards.map(card => cardToHtml(card))
    : cardBlock.fields.cards.map(({ sys }) =>
        cardToHtml(cards.find(item => item.sys.id === sys.id)),
      );
  return (
    <section id={cardBlock.fields.sectionLink} className="section-wrapper">
      <div className="inner">
        <CardTabs {...{ home, categoryPage, tag, setTag, query, setQuery }} />
        <section className={style.cardBlock}>{output}</section>
        {home && (
          <div className={style['cardBlock-more']}>
            <Link href={`/${toKebabCase(tag)}`}>
              <span className={style['cardBlock-more-button']}>
                <span>{`See all ${getButtonTitle(tag)} content`}</span>
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
