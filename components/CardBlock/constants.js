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