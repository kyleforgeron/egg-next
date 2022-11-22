import PropTypes from 'prop-types';
import { fetchEntries } from 'utils';
import Link from 'next/link';
import { Layout, BannerBlock, FooterBlock } from 'components';

const NotFound = ({ pages, siteIdentity }) => {
  return (
    <>
      <Layout
        title="Educators Going Global - Page not found"
        {...{ pages, siteIdentity }}
      />
      <BannerBlock
        title={`Sorry, we couldn't find that page!`}
        content={<Link href="/">Return home</Link>}
      />
      <FooterBlock />
    </>
  );
};

export const getStaticProps = async () => {
  const pages = await fetchEntries({ content_type: 'page' });
  const siteIdentity = await fetchEntries({ content_type: 'siteIdentity' });

  return {
    props: {
      pages,
      siteIdentity,
    },
  };
};

NotFound.defaultProps = {
  cards: [],
};

NotFound.propTypes = {
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
};

export default NotFound;
