import PropTypes from 'prop-types';
import classNames from 'classnames';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import style from './BannerBlock.module.scss';

const BannerBlock = ({ bannerBlock }) => {
  const content = parse(
    documentToHtmlString(bannerBlock.fields.content, richTextOptions),
  );
  return (
    <header
      id={bannerBlock.fields.sectionLink}
      className={classNames(style['banner-base'], {
        [style['banner-base--hero']]: !!bannerBlock.fields.background,
      })}
      style={{
        backgroundImage: `url('${bannerBlock.fields.background?.fields.file.url}')`,
      }}
    >
      <span className={style['banner-base-overlay']} />
      {!!bannerBlock.fields.background && (
        <video
          id="background-video"
          className={style['background-video']}
          autoPlay
          loop
          muted
        >
          <source
            src={bannerBlock.fields.background?.fields.file.url}
            type="video/mp4"
          />
        </video>
      )}
      {bannerBlock.fields.sectionTitle === 'Home Page Banner' ? (
        <h1
          className={classNames(
            style['banner-title'],
            style['banner-title--home'],
          )}
        >
          We show you how
          <br />
          you can <span className={style['banner-title--hollow']}>travel</span>
          <br />
          while you <span className={style['banner-title--hollow']}>teach</span>
        </h1>
      ) : (
        <h1 className={style['banner-title']}>
          {bannerBlock.fields.sectionTitle}
        </h1>
      )}
      <div className={style['banner-content']}>{content}</div>
    </header>
  );
};

BannerBlock.propTypes = {
  bannerBlock: PropTypes.object.isRequired,
};

export default BannerBlock;
