import React from 'react';
import PropTypes from 'prop-types';
import { nytHandler } from 'pages/api';
import { fetchEntries } from 'utils';
import { Layout } from 'components';
import style from 'components/BannerBlock/BannerBlock.module.scss';

const News = ({ results, pages, siteIdentity }) => {
  return (
    <>
      <Layout
        title="Educators Going Global - Top Stories"
        {...{ pages, siteIdentity }}
      />
      <header className={style["banner-base"]}>
        <h1 className={style["banner-title"]}>
          Today&apos;s Top Stories from the New York Times
        </h1>
      </header>
      <section className="inner">
        <ul>
          {results.map(article => (
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

export const getStaticProps = async () => {
  const URL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_KEY}`;
  const results = await nytHandler(URL);
  const pages = await fetchEntries({ content_type: 'page' });
  const siteIdentity = await fetchEntries({ content_type: 'siteIdentity' });

  return {
    props: {
      results,
      pages,
      siteIdentity,
    },
  };
};

News.defaultProps = {
  results: [],
};

News.propTypes = {
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
  results: PropTypes.array,
};

export default News;
