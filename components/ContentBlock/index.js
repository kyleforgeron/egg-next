import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import style from './ContentBlock.module.scss';

const ContentBlock = ({ contentBlock }) => {
  const router = useRouter();
  const story = router.pathname.includes('egg-stories');
  const content = parse(
    documentToHtmlString(contentBlock.fields.content, richTextOptions),
  );
  return (
    <section id={contentBlock.fields.sectionLink} className={!story && style["contentblock-wrapper"]}>
      <div className="inner">
        <div className={style['post-content']}>{content}</div>
      </div>
    </section>
  );
};

ContentBlock.propTypes = {
  contentBlock: PropTypes.object.isRequired,
};

export default ContentBlock;
