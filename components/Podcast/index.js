import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import Image from 'next/image';
import style from './Podcast.module.scss';

// Render a podcast player with multiple episodes

const Podcast = ({ featuretteBlock }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [content, setContent] = useState('loading');
  const shortDescription = parse(
    documentToHtmlString(
      featuretteBlock.fields.shortDescription,
      richTextOptions,
    ),
  );
  const fullDescription = parse(
    documentToHtmlString(featuretteBlock.fields.description, richTextOptions),
  );
  useEffect(
    () => setContent(showDetails ? fullDescription : shortDescription),
    [showDetails],
  );
  return (
    <div className={style['podcast']}>
      <div className={style['podcast-border']}>
        <a
          className={style['podcast-image']}
          style={{
            backgroundImage: `url('https:${featuretteBlock.fields.image.fields.file.url}')`,
          }}
        />
        <div className={style['podcast-content']}>
          <h3 className={style['podcast-title']}>
            {featuretteBlock.fields.title}
          </h3>
          <div className={style['podcast-details']}>
            <i>
              posted by {featuretteBlock.fields.author} on{' '}
              {new Date(featuretteBlock.fields.datePosted).toLocaleDateString()}
            </i>
            <button
              className={style['podcast-infobutton']}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'less info' : 'more info'}
            </button>
            <div>{content}</div>
          </div>

          <audio
            className={style['podcast-audio']}
            controls
            controlsList="nofullscreen nodownload noplaybackrate"
          >
            <source src={featuretteBlock.fields.episodeSrc} />
          </audio>
        </div>
      </div>
    </div>
  );
};

Podcast.propTypes = {
  featuretteBlock: PropTypes.object.isRequired,
};

export default Podcast;
