import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import parse from "html-react-parser";
import { richTextOptions } from "utils";

const ContentBlock = ({ contentBlock }) => {
  const content = parse(
    documentToHtmlString(contentBlock.fields.content, richTextOptions)
  );
  return (
    <section id={contentBlock.fields.sectionLink}>
      <div className="wrapper">
        <div className="inner">
          <h3 className="major">{contentBlock.fields.sectionTitle}</h3>
          <div>{content}</div>
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;
