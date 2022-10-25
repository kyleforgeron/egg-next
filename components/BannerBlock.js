import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';

const BannerBlock = ({ bannerBlock }) => {
  const content = parse(
    documentToHtmlString(bannerBlock.fields.content, richTextOptions)
  );
  return (
    <header
      id={bannerBlock.fields.sectionLink}
      className={`banner-base ${
        !!bannerBlock.fields.background ? "banner-base--hero" : ""
      }`}
      style={{ backgroundImage: `url('${bannerBlock.fields.background?.fields.file.url}')`}}
    >
      <h1 className="banner-title">{bannerBlock.fields.sectionTitle}</h1>
      <div className="banner-content">
        {content}
      </div>
    </header>
  );
};

BannerBlock.propTypes = {
  bannerBlock: PropTypes.object.isRequired,
};

export default BannerBlock;
