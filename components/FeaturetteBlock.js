import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import Image from 'next/image';

const FeaturetteBlock = ({ featuretteBlock }) => {
  const content = parse(
    documentToHtmlString(featuretteBlock.fields.content, richTextOptions)
  );
  if (featuretteBlock.fields.imageLocation) {
    return (
      <section id={
        featuretteBlock.fields.sectionLink
      } className="wrapper spotlight style1">
        <div className="inner">
            <a href="#" className="image">
              <Image src={featuretteBlock.fields.image} />
            </a>
            <div className="content">
              <h2 className="major">
                {featuretteBlock.fields.sectionTitle}
              </h2>
              {content}
            </div>
        </div>
      </section>
    );
  } else {
    return (
      <section id="${
        featuretteBlock.fields.sectionLink
      }" className="wrapper alt spotlight style2">
        <div className="inner">
            <a href="#" className="image">
              <Image src={featuretteBlock.fields.image} />
            </a>
            <div className="content">
              <h2 className="major">
                {featuretteBlock.fields.sectionTitle}
              </h2>
              {content}
            </div>
        </div>
      </section>
    );
  }
};

export default FeaturetteBlock;