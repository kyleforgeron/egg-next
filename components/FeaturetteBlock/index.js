import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import Image from 'next/image';

const FeaturetteBlock = ({ featuretteBlock }) => {
  const content = parse(
    documentToHtmlString(featuretteBlock.fields.content, richTextOptions),
  );
  if (featuretteBlock.fields.imageLocation) {
    return (
      <section id={featuretteBlock.fields.sectionLink}>
        <div className="inner">
          <a href="#" className="image">
            <Image
              src={featuretteBlock.fields.image}
              alt={featuretteBlock.fields.sectionTitle}
            />
          </a>
          <div>
            <h2>{featuretteBlock.fields.sectionTitle}</h2>
            {content}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section id={featuretteBlock.fields.sectionLink}>
        <div className="inner">
          <a href="#" className="image">
            <Image
              src={featuretteBlock.fields.image}
              alt={featuretteBlock.fields.sectionTitle}
            />
          </a>
          <div>
            <h2>{featuretteBlock.fields.sectionTitle}</h2>
            {content}
          </div>
        </div>
      </section>
    );
  }
};

FeaturetteBlock.propTypes = {
  featuretteBlock: PropTypes.object.isRequired,
};

export default FeaturetteBlock;
