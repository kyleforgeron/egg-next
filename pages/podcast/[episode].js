import React from 'react';
import PropTypes from 'prop-types';
import { fetchEntries, getComponent } from 'utils';
import { Layout, CardBlock, Audio, FooterBlock } from 'components';

const Episode = ({ podcastEpisode, pages, siteIdentity, cards }) => {
  return (
    <>
      <Layout
        title={`Educators Going Global - ${podcastEpisode.fields.title}`}
        {...{ pages, siteIdentity }}
      />
      {podcastEpisode.fields.components.map(item => getComponent(podcastEpisode.fields.title, item, cards, podcastEpisode.metadata))}
      <div className="inner" style={{marginBottom: '64px'}}>
        <Audio src={podcastEpisode.fields.episodeSrc} />
      </div>
      <CardBlock pageTitle={podcastEpisode.fields.title} postPage {...{ cards }} />
      <FooterBlock />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const pages = await fetchEntries({ content_type: 'page' });
  const postPages = await fetchEntries({ content_type: 'postPage' });
  const siteIdentity = await fetchEntries({ content_type: 'siteIdentity' });
  const podcastEpisode = postPages.find(page => page.fields.slug === params.episode);
  const cards = await fetchEntries({ content_type: 'featuretteBlock' });

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
