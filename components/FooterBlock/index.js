import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';

const FooterBlock = ({ footerBlock }) => {
  const content = parse(
    documentToHtmlString(footerBlock.fields.content, richTextOptions),
  );
  return (
    <section id="footer">
      <div className="inner">
        <div>{content}</div>
      </div>
    </section>
  );
};

FooterBlock.propTypes = {
  footerBlock: PropTypes.object.isRequired,
};

export default FooterBlock;
