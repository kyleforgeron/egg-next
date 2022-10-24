import { fetchEntries } from 'utils';
import { toKebabCase, getComponent } from 'utils';
import { NavBar } from 'components';

export default function Home({ pages, siteIdentity, page, cards }) {
  return (
    <>
      <NavBar {...{ pages, siteIdentity }} />
      {page[0].components.map(item => getComponent(item, cards))}
    </>
  );
}

export async function getStaticProps() {
  const pages = await fetchEntries({ content_type: "page" });
  const siteIdentity = await fetchEntries({content_type: 'siteIdentity'});
  const page = pages
    .map((p) => p.fields)
    .filter((page) => toKebabCase(page.title) === "home-page");
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
