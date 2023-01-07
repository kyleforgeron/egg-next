import { toKebabCase } from "utils";

export const getButtonTitle = label => {
  switch (label) {
    case '':
      return 'Everything';
    case 'schoolLife':
      return 'School Life';
    case 'recruiting':
      return 'Recruiting';
    case 'transitions':
      return 'Transitions';
    case 'finances':
      return 'Finances';
    case 'travel':
      return 'Travel';
    case 'podcastEpisode':
      return 'Podcast Episodes';
    case 'blogPost':
      return 'Blog Posts';
    case 'libraryResource':
      return 'Resource Library';
    case 'eggStories':
      return 'EGG Stories';
    default:
      return label;
  }
}

export const getBlockTitle = title => {
  if (title.includes('blog')) return 'Blog Posts';
  if (title.includes('podcast')) return 'Podcast Episodes';
  if (title.includes('resource-library')) return 'Resource Library';
  if (title.includes('egg-stories')) return 'Stories from Educators Going Global';
}

export const getContentTag = title => {
  console.log('getting content tag for', title);
  if (title.toLowerCase().includes('blog')) return 'blog-post';
  if (title.toLowerCase().includes('podcast')) return 'podcast-episode';
  if (title.toLowerCase().includes('resource library')) return 'library-resource';
}

export const filteredList = (cards, tag, query, home, route, pageTitle) => cards.filter(
  card => {
    const contentTag = getContentTag(pageTitle) || toKebabCase(pageTitle.toLowerCase());
    console.log(getContentTag(pageTitle), contentTag);
    // Don't show a card for the same post they're already viewing
    if (card.fields.title === pageTitle) {
      console.log(card.fields.title, pageTitle);
      return false;
    } 
    // If not on the home page, filter by the relevant topic or content type of the current section page
    if (!home) {
      if (
        !card.metadata.tags.find(tagObj => {
          if (contentTag === 'library-resource') console.log(tagObj.sys.id, contentTag);
          return (
            tagObj.sys.id.indexOf(contentTag) > -1 ||
            toKebabCase(tagObj.sys.id).indexOf(contentTag) > -1 ||
            toKebabCase(contentTag).indexOf(
              toKebabCase(tagObj.sys.id),
            ) > -1
          );
        })
      )
        return false;
    }
    // If a tag / tab has been selected, add that filter
    if (tag) {
      console.log('selected tag', tag);
      if (
        !card.metadata.tags.find(tagObj => {
          return tagObj.sys.id.indexOf(tag) > -1;
        })
      )
        return false;
    }
    // If a query has been entered in the search bar, include any cards with matching titles or descriptions
    if (card.fields.title.toLowerCase().indexOf(query.toLowerCase()) > -1)
      return true;
    if (
      card.fields.shortDescription?.content[0]?.content.filter(
        item => item.value?.toLowerCase().indexOf(query.toLowerCase()) > -1,
      ).length > 0
    )
      return true;
    return false;
  }
  // Finally, move promoted cards to the front of the array
).sort((a,b) => {
  // if (a.fields.promoted || b.fields.promoted) console.log('sorting by promoted', a.fields.title, a.fields.promoted, b.fields.title, b.fields.promoted);
  return b.fields.promoted - a.fields.promoted;
});