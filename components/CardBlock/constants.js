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

export const getContentTag = (route, pageTitle) => {
  if (route.includes('blog')) return 'blog-post';
  if (route.includes('podcast')) return 'podcast-episode';
  if (route.includes('resource-library')) return 'library-resource';
  if (route.includes('egg-stories')) return 'egg-stories';
  if (pageTitle.includes('Blog')) return 'blog-post';
  if (pageTitle.includes('Podcast')) return 'podcast-episode';
  if (pageTitle.includes('Resource Library')) return 'library-resource';
  if (pageTitle.includes('EGG Stories')) return 'egg-stories';
  if (pageTitle.includes('Special Thanks')) return 'eggheads-advisory-board';
  if (pageTitle.includes('Start Your Journey')) return 'start-your-journey';
}

export const filteredList = (cards, tag, query, route, home, pageTitle) => cards.filter(
  card => {
    const contentTag = getContentTag(route, pageTitle) || toKebabCase(pageTitle.toLowerCase());
    // Don't show a card for the same post they're already viewing
    if (card.fields.title.toLowerCase() === pageTitle.toLowerCase()) {
      return false;
    } 
    // If not on the home page, filter by the relevant topic or content type of the current section page
    if (!home) {
      if (
        !card.metadata.tags.find(tagObj => {
          //console.log(tagObj.sys.id);
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
  // Sort based on most recently-posted content
).sort((a,b) => {
  return new Date(b.fields.datePosted) - new Date(a.fields.datePosted)
}
  // Finally, move promoted cards to the front of the array
).sort((a,b) => {
  return b.fields.promoted - a.fields.promoted;
});