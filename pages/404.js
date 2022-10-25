import PropTypes from 'prop-types';
import { fetchEntries } from "utils";
import Link from "next/link";
import Head from "next/head";
import { NavBar } from "components";

const NotFound = ({ pages, siteIdentity }) => {
  return (
    <>
      <Head>
        <title>Triad x Next.js - Page not found</title>
      </Head>
      <NavBar {...{ pages, siteIdentity }} />
      <div className="page-wrapper">
        <section className="banner-base">
          <h1>{`We're sorry, that page could not be found.`}</h1>
          <Link href="/">Return home</Link>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pages = await fetchEntries({ content_type: "page" });
  const siteIdentity = await fetchEntries({ content_type: "siteIdentity" });

  return {
    props: {
      pages,
      siteIdentity,
    },
  };
}

NotFound.defaultProps = {
  cards: [],
};

NotFound.propTypes = {
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
};

export default NotFound;
