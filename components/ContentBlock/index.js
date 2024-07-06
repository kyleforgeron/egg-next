import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { richTextOptions } from 'utils';
import style from './ContentBlock.module.scss';

const ContentBlock = ({ contentBlock }) => {
  const router = useRouter();
  const story = router.pathname.includes('egg-stories');
  const sectionPage = router.pathname.includes('[page]');
  const addTargetBlank = html => {
    // Regular expression to find <a> tags with href attribute
    const pattern = /<a\s+([^>]*?href=["'][^"']*["'][^>]*)>/gi;

    // Replacement function to add target="_blank" if href doesn't contain 'educatorsgoingglobal.com'
    const replacement = (match, content) => {
      if (!/href=["'][^"']*educatorsgoingglobal\.com/.test(content)) {
        return `<a ${content} target="_blank">`;
      }
      return match;
    };

    // Using string.replace to replace the pattern
    return html.replace(pattern, replacement);
  };

  const content = parse(
    addTargetBlank(
      documentToHtmlString(contentBlock.fields.content, richTextOptions),
    ),
  );
  return (
    <section
      id={contentBlock.fields.sectionLink}
      className={!story && !sectionPage ? style['contentblock-wrapper'] : ''}
    >
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
