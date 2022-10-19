import React from 'react';
import { nytHandler } from 'pages/api';

const TopStories = ({ results }) => {
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

export async function getStaticProps() {
  const URL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;
  const results = await nytHandler(URL);

  return {
    props: {
      results,
    },
  };
}

export default TopStories;
