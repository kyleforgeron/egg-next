import React from 'react';
import PropTypes from 'prop-types';
import { fetchEntries, getComponent } from 'utils';
import { Layout, FooterBlock } from 'components';

const Post = ({ blogPost, pages, siteIdentity, cards }) => {
  return (
    <>
      <Layout
        title={`Educators Going Global - ${blogPost.fields.title}`}
        {...{ pages, siteIdentity }}
      />
      {blogPost.fields.components.map(item => getComponent(blogPost.fields.title, item, cards, blogPost.metadata))}
      <FooterBlock />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const pages = await fetchEntries({ content_type: 'page' });
  const postPages = await fetchEntries({ content_type: 'postPage' });
  const siteIdentity = await fetchEntries({ content_type: 'siteIdentity' });
  const blogPost = postPages.find(page => page.fields.slug === params.post);
  const cards = await fetchEntries({ content_type: 'featuretteBlock' });

  return {
    props: {
      blogPost,
      pages,
      siteIdentity,
      cards,
    },
  };
};

Post.defaultProps = {
  cards: [],
};

Post.propTypes = {
  blogPost: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
  cards: PropTypes.array,
};

export default Post;
