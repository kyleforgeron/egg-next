import PropTypes from 'prop-types';
import classNames from 'classnames';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import Image from 'next/image';
import Script from 'next/script';
import style from './Podcast.module.scss';

const Podcast = ({ featuretteBlock }) => {
  const content = parse(
    documentToHtmlString(featuretteBlock.fields.description, richTextOptions),
  );
  console.log("Podcast", featuretteBlock.fields.episodeSrc, featuretteBlock.fields.episodeId);
  return (
    <div className={style['podcast']}>
      <h3 className={style['podcast-title']}>{featuretteBlock.fields.title}</h3>
      <p className={style['podcast-author']}>{featuretteBlock.fields.author}</p>
      <p className={style['podcast-date']}>{featuretteBlock.fields.datePosted}</p>
      <a
        className={classNames(style['podcast-image'], {
          [style['podcast-image--left']]: featuretteBlock.fields.imageLeft,
          [style['podcast-image--right']]: !featuretteBlock.fields.imageLeft,
        })}
      >
        <Image
          src={`https:${featuretteBlock.fields.image.fields.file.url}`}
          height={featuretteBlock.fields.image.fields.file.details.image.height}
          width={featuretteBlock.fields.image.fields.file.details.image.width}
          alt={featuretteBlock.fields.sectionTitle}
        />
      </a>
      <div id={`buzzsprout-player-${featuretteBlock.fields.episodeId}`} />
      <Script
        src={featuretteBlock.fields.episodeSrc}
        type="text/javascript"
        charset="utf-8"
      />
      <div className={style['podcast-description']}>{content}</div>
    </div>
  );
};

Podcast.propTypes = {
  featuretteBlock: PropTypes.object.isRequired,
};

export default Podcast;
