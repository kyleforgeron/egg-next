import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import style from './Card.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Audio } from 'components';
import * as Open from 'assets/arrow-external.svg';

const Card = ({ featuretteBlock }) => {
  const [content, setContent] = useState('loading');
  const cardType = featuretteBlock.metadata.tags.find(tagObj =>
    ['podcastEpisode', 'blogPost', 'libraryResource', 'eggStories'].includes(
      tagObj.sys.id,
    ),
  )?.sys.id;
  const slug = type => {
    switch (type) {
      case 'podcastEpisode':
        return 'podcast';
      case 'blogPost':
        return 'blog';
      case 'libraryResource':
        return 'library-resources';
      case 'eggStories':
        return 'egg-stories';
      default:
        return '';
    }
  };
  const shortDescription = parse(
    documentToHtmlString(
      featuretteBlock.fields.shortDescription,
      richTextOptions,
    ),
  );
  useEffect(() => setContent(shortDescription), []);
  return (
    <div className={style['card']}>
      <div className={style['card-border']}>
        <Link
          href={
            cardType === 'podcastEpisode' ||
            cardType === 'blogPost' ||
            cardType === 'eggStories'
              ? `/${slug(cardType)}/${featuretteBlock.fields.slug}`
              : cardType === 'libraryResource'
              ? featuretteBlock.fields.slug || ''
              : ''
          }
          passHref
        >
          <a
            className={style['card-image']}
            style={{
              backgroundImage: `url('https:${featuretteBlock.fields.image.fields.file.url}')`,
            }}
            target={cardType === 'libraryResource' && '_blank'}
          />
        </Link>
        <div className={style['card-content']}>
          <h3 className={style['card-title']}>
            {featuretteBlock.fields.title}
          </h3>
          <div className={style['card-details']}>
            <i>
              {featuretteBlock.fields.author &&
                `by ${featuretteBlock.fields.author} - `}
              {featuretteBlock.fields.datePosted &&
                new Date(
                  featuretteBlock.fields.datePosted,
                ).toLocaleDateString()}
            </i>
            <div>{content}</div>
          </div>
          {cardType === 'podcastEpisode' && (
            <Audio src={featuretteBlock.fields.episodeSrc} />
          )}
          <div className={style['card-details']}>
            <Link
              href={
                cardType === 'podcastEpisode' ||
                cardType === 'blogPost' ||
                cardType === 'eggStories'
                  ? `/${slug(cardType)}/${featuretteBlock.fields.slug}`
                  : cardType === 'libraryResource'
                  ? featuretteBlock.fields.slug || ''
                  : ''
              }
              passHref
            >
              <a
                className={style['card-more-button']}
                target={cardType === 'libraryResource' && '_blank'}
              >
                <span>
                  {cardType === 'podcastEpisode'
                    ? 'Episode page'
                    : cardType === 'blogPost'
                    ? 'Read this post'
                    : cardType === 'eggStories'
                    ? 'Watch the video'
                    : cardType === 'libraryResource'
                    ? 'Visit their page'
                    : ''}
                </span>
                <Image src={Open} alt="open-page" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  featuretteBlock: PropTypes.object.isRequired,
};

export default Card;
