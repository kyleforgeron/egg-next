import React from "react";
import PropTypes from 'prop-types';
import Head from "next/head";
import { nytSearch } from "pages/api";
import { fetchEntries } from "utils";
import { NavBar } from "components";

const Results = ({ query, results, pages, siteIdentity }) => {
  return (
    <>
      <Head>
        <title>Triad x Next.js - search for &apos;{query}&apos;</title>
      </Head>
      <NavBar {...{ pages, siteIdentity }} />
      <header className="banner-base">
        <h1 className="banner-title">New York Times Results</h1>
        <h3 className="major">for search term <i>{query}</i></h3>
      </header>
      <section className="inner">
        <ul>
          {results.map((article) => (
            <li key={article.uri}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${params.query}&api-key=${process.env.NYT_KEY}`;
  const results = await nytSearch(URL);
  const pages = await fetchEntries({ content_type: "page" });
  const siteIdentity = await fetchEntries({ content_type: "siteIdentity" });

  return {
    props: {
      query: params.query,
      results,
      pages,
      siteIdentity,
    },
  };
}

Results.defaultProps = {
  results: [],
};

Results.propTypes = {
  query: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
  results: PropTypes.array,
};

export default Results;
