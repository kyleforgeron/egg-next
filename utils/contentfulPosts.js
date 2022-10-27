const client = require('contentful').createClient({
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN,
});

export const fetchEntries = async params => {
  const entries = await client.getEntries({ ...params });
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${contentType.name}.`);
};
