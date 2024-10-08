import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, CardTabs } from 'components';
import { toKebabCase } from 'utils';
import * as Arrow from 'assets/arrow-narrow-right.svg';
import { filteredList, getBlockTitle, getButtonTitle } from './constants';
import style from './CardBlock.module.scss';

const CardBlock = ({ cards, pageTitle, postPage }) => {
  const home = pageTitle === 'Home Page';
  const categoryPage = [
    'Home Page',
    'Blog',
    'Podcast',
    'Resource Library',
    'EGG Stories',
  ].includes(pageTitle);
  const [filteredCards, setFilteredCards] = useState(null);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');
  const router = useRouter();
  const route = router.pathname;

  useEffect(() => {
    const cardList = filteredList(cards, tag, query, route, home, pageTitle);
    setFilteredCards(home || postPage ? cardList.splice(0, 3) : cardList);
  }, [cards, query, tag]); //eslint-disable-line

  const cardToHtml = card => <Card key={card.sys.id} featuretteBlock={card} />;
  const output = !!filteredCards
    ? filteredCards.map(card => cardToHtml(card))
    : 'loading...';
  return (
    <section className="cardblock-wrapper">
      <div className="inner">
        {postPage ? (
          <h2 className={style['cardBlock-header']}>
            More {getBlockTitle(route)}
          </h2>
        ) : (
          !['Special Thanks', 'About Your Hosts'].includes(pageTitle) && (
            <CardTabs
              {...{ home, categoryPage, tag, setTag, query, setQuery }}
            />
          )
        )}
        <section className={style.cardBlock}>{output}</section>
        {home && !!tag && (
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

CardBlock.defaultProps = {
  postPage: false,
};

CardBlock.propTypes = {
  cards: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
  postPage: PropTypes.bool,
};

export default CardBlock;
