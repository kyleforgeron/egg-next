export const nytHandler = async url => {
  const response = await fetch(url).then(res => res.json());
  return response.results;
};

export const nytSearch = async url => {
  const response = await fetch(url).then(res => res.json());
  const docs = response.response.docs ?? [];
  const results = docs.map(doc => ({
    title: doc?.headline?.main,
    url: doc.web_url,
    uri: doc.uri,
  }));
  return results;
};
