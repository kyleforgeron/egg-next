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
      return 'Library Resources';
    case 'eggStories':
      return 'EGG Stories';
    default:
      return label;
  }
}

export const getBlockTitle = path => {
  if (path.includes('blog')) return 'Blog Posts';
  if (path.includes('podcast')) return 'Podcast Episodes';
  if (path.includes('library-resources')) return 'Library Resources';
  if (path.includes('egg-stories')) return 'Stories from Educators Going Global';
}

export const getContentTag = path => {
  if (path.includes('blog')) return 'blog-post';
  if (path.includes('podcast')) return 'podcast-episode';
  if (path.includes('library-resources')) return 'library-resources';
  if (path.includes('egg-stories')) return 'egg-stories';
  if (path.includes('eggheads-advisory-board')) return 'eggheads-advisory-board';
  if (path.includes('about-your-hosts')) return 'about-your-hosts';
}

export const filteredList = (cards, tag, query, home, route, pageTitle) => cards.filter(
  card => {
    const contentTag = getContentTag(route) || toKebabCase(pageTitle.toLowerCase());
    // Don't show a card for the same post they're already viewing
    if (card.fields.title === pageTitle) return false;
    // If not on the home page, filter by the relevant topic or content type of the current section page
    if (!home) {
      if (
        !card.metadata.tags.find(tagObj => {
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
  // Finally, move promoted cards to the front of the array
).sort((a,b) => a.fields.promoted - b.fields.promoted);