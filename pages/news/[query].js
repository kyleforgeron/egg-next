import React from 'react';
import { nytSearch } from 'pages/api';

const Results = ({ results }) => {
  console.log(results);
  return (
    <ul>
      {results.map((article) => (
        <li key={article.uri}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

const API_KEY = "azYGqrp7QPWXHao9ArfqKXBlEVtTXTHv";

export async function getServerSideProps({ params }) {
  const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${params.query}&api-key=${API_KEY}`;
  const results = await nytSearch(URL);
  console.log(results);

  return {
    props: {
      results,
    },
  };
}

export default Results;
