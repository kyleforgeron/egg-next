import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import Image from 'next/image';
import style from './Podcast.module.scss';

const Podcast = ({ featuretteBlock }) => {
  const content = parse(
    documentToHtmlString(featuretteBlock.fields.description, richTextOptions),
  );
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
          src={featuretteBlock.fields.image}
          alt={featuretteBlock.fields.title}
        />
      </a>
      <div id={`buzzsprout-player-${featuretteBlock.fields.episodeId}`} />
      <script
        src={featuretteBlock.fields.episodeSrc}
        type="text/javascript"
        charset="utf-8"
      />
      <p className={style['podcast-description']}>{content}</p>
    </div>
  );
};

Podcast.propTypes = {
  featuretteBlock: PropTypes.object.isRequired,
};

export default Podcast;
