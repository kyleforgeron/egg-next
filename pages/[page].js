import PropTypes from 'prop-types';
import { fetchEntries, toKebabCase, getComponent } from 'utils';
import { Layout, FooterBlock } from 'components';

const Page = ({ pages, siteIdentity, page, cards }) => {
  const pageTitle = page[0].title;
  const description = page[0].description;
  const keywords = page[0].keywords;
  return (
    <>
      <Layout
        title={`Educators Going Global - ${pageTitle}`}
        {...{ description, keywords, pages, siteIdentity }}
      />
      {page[0].components.map(item =>
        getComponent(pageTitle, item, cards, page[0], page[0].metadata),
      )}
      <FooterBlock />
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await fetchEntries({ content_type: 'page' });
  const pages = res.map(p => p.fields);
  const paths = pages.map(page => ({
    params: { page: toKebabCase(page.title) },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const pages = await fetchEntries({ content_type: 'page' });
  const siteIdentity = await fetchEntries({ content_type: 'siteIdentity' });
  const page = pages
    .map(p => p.fields)
    .filter(page => toKebabCase(page.title) === params.page);
  const cards = await fetchEntries({ content_type: 'featuretteBlock', limit: 1000 });

  return {
    props: {
      pages,
      siteIdentity,
      page,
      cards,
    },
  };
};

Page.defaultProps = {
  cards: [],
};

Page.propTypes = {
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
  page: PropTypes.array.isRequired,
  cards: PropTypes.array,
};

export default Page;
