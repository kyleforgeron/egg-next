import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { fetchEntries, getComponent } from 'utils';
import { Layout, FooterBlock, CardBlock } from 'components';

const Story = ({ eggStory, pages, siteIdentity, cards }) => {
  const description = eggStory.fields.description;
  const keywords = eggStory.fields.keywords;
  return (
    <>
      <Layout
        title={`Educators Going Global - ${eggStory.fields.title}`}
        {...{ description, keywords, pages, siteIdentity }}
      />
      {eggStory.fields.components.map(item =>
        getComponent(eggStory.fields.title, item, cards, eggStory, eggStory.metadata),
      )}
      <div className="inner" style={{ margin: '64px auto' }}>
        {parse(eggStory.fields.episodeSrc)}
      </div>
      <CardBlock pageTitle={eggStory.fields.title} postPage {...{ cards }} />
      <FooterBlock />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const pages = await fetchEntries({ content_type: 'page' });
  const postPages = await fetchEntries({ content_type: 'postPage' });
  const siteIdentity = await fetchEntries({ content_type: 'siteIdentity' });
  const eggStory = postPages.find(page => page.fields.slug === params.story);
  const cards = await fetchEntries({ content_type: 'featuretteBlock', limit: 1000 });

  return {
    props: {
      eggStory,
      pages,
      siteIdentity,
      cards,
    },
  };
};

Story.defaultProps = {
  cards: [],
};

Story.propTypes = {
  eggStory: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
  cards: PropTypes.array,
};

export default Story;
