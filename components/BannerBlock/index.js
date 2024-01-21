import PropTypes from 'prop-types';
import classNames from 'classnames';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import { buttons } from 'components/CardTabs/constants';
import { getButtonTitle } from 'components/CardBlock/constants';
import style from './BannerBlock.module.scss';
import Link from 'next/link';

const BannerBlock = ({ bannerBlock, pageMeta, page, pageTitle, content }) => {
  const synopsis = parse(
    documentToHtmlString(bannerBlock?.fields.synopsis, richTextOptions),
  );
  // console.log('page', page, 'pageMeta', pageMeta, 'pageTitle', pageTitle);
  return (
    <header
      id={bannerBlock?.fields.sectionLink}
      className={classNames(style['banner-base'], {
        [style['banner-base--home']]: ['Home Page', 'Blog'].includes(pageTitle),
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
          <span>Travel. </span>
          <span className={style['banner-title--hollow']}>Teach. </span>
          Connect.
        </h1>
      ) : (
        <div
          className={classNames(style['banner-title'], {
            [style['banner-title--post']]: page?.sys?.contentType.sys.id === "postPage",
          })}
        >
          {pageMeta?.tags &&
            pageMeta.tags.map(tag => {
              if (buttons(true).includes(tag.sys.id)) {
                return (
                  <h3 className={style['banner-title--tag']} key={tag.sys.id}>
                    {getButtonTitle(tag.sys.id)}
                  </h3>
                );
              }
            })}
          <h1>{bannerBlock?.fields.sectionTitle}</h1>
        </div>
      )}
      <h3
        className={classNames(style['banner-content'], {
          [style['banner-content--home']]:
            bannerBlock?.fields.sectionTitle === 'Home Page Banner',
        })}
      >
        {content || (!!synopsis[0] && synopsis) || bannerBlock?.fields.synopsis}
        {bannerBlock?.fields.sectionTitle === 'Home Page Banner' && (
          <div className={style['banner-actions']}>
            <Link href="/podcast">
              <button
                className={classNames(
                  style['banner-button'],
                  style['banner-button--white'],
                )}
              >
                Listen to the Podcast
              </button>
            </Link>
            <Link href="/start-your-journey">
              <button className={style['banner-button']}>Start Your Journey</button>
            </Link>
          </div>
        )}
      </h3>
      <span id="topics" />
    </header>
  );
};

BannerBlock.defaultProps = {
  pageMeta: {},
  pageTitle: '',
  content: null,
  bannerBlock: null,
};

BannerBlock.propTypes = {
  bannerBlock: PropTypes.object,
  pageMeta: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.node,
};

export default BannerBlock;
