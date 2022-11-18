import PropTypes from 'prop-types';
import { fetchEntries } from 'utils';
import Link from 'next/link';
import { Layout } from 'components';

const NotFound = ({ pages, siteIdentity }) => {
  return (
    <>
      <Layout
        title="Educators Going Global - Page not found"
        {...{ pages, siteIdentity }}
      />
      <div>
        <section className="inner">
          <h1>{`We're sorry, that page could not be found.`}</h1>
          <Link href="/">Return home</Link>
        </section>
      </div>
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
