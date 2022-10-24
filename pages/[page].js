import { fetchEntries } from 'utils';
import { toKebabCase, getComponent } from 'utils';
import NavBar from 'components/NavBar';

const Page = ({ pages, siteIdentity, page, cards }) => {
  return (
    <>
      <NavBar {...{ pages, siteIdentity }} />
      {page[0].components.map(item => getComponent(item, cards))}
    </>
  );
};

export default Page;



export async function getStaticPaths() {
  const res = await fetchEntries({content_type: 'page'});
  const pages = res.map((p) => p.fields);
  const paths = pages.map(page => ({ params: { page: toKebabCase(page.title) }}));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const pages = await fetchEntries({ content_type: "page" });
  const siteIdentity = await fetchEntries({content_type: 'siteIdentity'});
  const page = pages.map((p) => p.fields).filter(page => toKebabCase(page.title) === params.page);
  const cards = await fetchEntries({ content_type: "card" });

  return {
    props: {
      pages,
      siteIdentity,
      page,
      cards,
    },
  };
}
