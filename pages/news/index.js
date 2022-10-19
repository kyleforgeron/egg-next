import React, { useState } from 'react';
import { useRouter } from 'next/router';

const News = ({ results }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const onSubmit = e => {
    e.preventDefault();
    router.push(`/news/${query}`);
  }
  return (
    <form {...{ onSubmit }}>
      <input type="text" onChange={e => setQuery(e.target.value)} />
      <input type="submit" label="Submit" />
    </form>
  );
};

export default News;
