import PropTypes from 'prop-types';
import classNames from 'classnames';
import { buttons } from 'components/CardTabs/constants';
import { getButtonTitle } from 'components/CardBlock/constants';
import style from './BannerBlock.module.scss';

const BannerBlock = ({ bannerBlock, pageMeta, title, content }) => {
  return (
    <header
      id={title || bannerBlock.fields.sectionLink}
      className={classNames(style['banner-base'], {
        [style['banner-base--hero']]: !!bannerBlock?.fields.background,
      })}
      style={{
        backgroundImage: `url('${bannerBlock?.fields?.background?.fields.file.url}')`,
      }}
    >
      <span className={style['banner-base-overlay']} />
      {!!bannerBlock?.fields.background && (
        <video
          id="background-video"
          className={style['background-video']}
          autoPlay
          loop
          muted
        >
          <source
            src={bannerBlock?.fields?.background?.fields.file.url}
            type="video/mp4"
          />
        </video>
      )}
      {bannerBlock?.fields.sectionTitle === 'Home Page Banner' ? (
        <h1
          className={classNames(
            style['banner-title'],
            style['banner-title--home'],
          )}
        >
          <span>Travel.  </span> 
          <span className={style['banner-title--hollow']}>Teach.  </span>
          Connect.
        </h1>
      ) : (
        <div className={style['banner-title']}>
          {pageMeta?.tags && pageMeta.tags.map(tag => {
            if (buttons(true).includes(tag.sys.id)) {
              return <h3 className={style['banner-title--tag']} key={tag.sys.id}>{getButtonTitle(tag.sys.id)}</h3>;
            }
          })}
          <h1>{title || bannerBlock?.fields.sectionTitle}</h1>
        </div>
      )}
      <h3 className={style['banner-content']}>{content || bannerBlock?.fields.synopsis}</h3>
    </header>
  );
};

BannerBlock.defaultProps = {
  pageMeta: {},
  title: '',
  content: null,
};

BannerBlock.propTypes = {
  bannerBlock: PropTypes.object.isRequired,
  pageMeta: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.node,
};

export default BannerBlock;
