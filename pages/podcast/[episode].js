import React from 'react';
import PropTypes from 'prop-types';
import { fetchEntries, getComponent } from 'utils';
import { Layout, CardBlock, Audio, FooterBlock } from 'components';

const Episode = ({ podcastEpisode, pages, siteIdentity, cards }) => {
  const components = [
    podcastEpisode.fields.components[0],
    <div key="episode" className="inner" style={{ margin: '64px auto' }}>
      <Audio src={podcastEpisode.fields.episodeSrc} />
    </div>,
    ...podcastEpisode.fields.components.slice(1),
  ];
  const description = podcastEpisode.fields.description;
  const keywords = podcastEpisode.fields.keywords;
  return (
    <>
      <Layout
        title={`Educators Going Global - ${podcastEpisode.fields.title}`}
        {...{ description, keywords, pages, siteIdentity }}
      />
      {components.map(item =>
        getComponent(
          podcastEpisode.fields.title,
          item,
          cards,
          podcastEpisode,
          podcastEpisode.metadata,
        ),
      )}
      <CardBlock
        pageTitle={podcastEpisode.fields.title}
        postPage
        {...{ cards }}
      />
      <FooterBlock />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const pages = await fetchEntries({ content_type: 'page' });
  const postPages = await fetchEntries({ content_type: 'postPage' });
  const siteIdentity = await fetchEntries({ content_type: 'siteIdentity' });
  const podcastEpisode = postPages.find(
    page => page.fields.slug === params.episode,
  );
  const cards = await fetchEntries({ content_type: 'featuretteBlock', limit: 1000 });

  return {
    props: {
      podcastEpisode,
      pages,
      siteIdentity,
      cards,
    },
  };
};

Episode.defaultProps = {
  cards: [],
};

Episode.propTypes = {
  podcastEpisode: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
  cards: PropTypes.array,
};

export default Episode;
