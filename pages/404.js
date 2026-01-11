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
        pageTitle={`Sorry, we couldn't find that page. Please try again later or contact us!`}
        content={<Link href="/">Return home</Link>}
      />
      <FooterBlock />
    </>
  );
};

export const getStaticProps = async () => {
  const pages = await fetchEntries({ content_type: 'page', limit: 1000 });
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
