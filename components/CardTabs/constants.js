export const buttons = (categoryPage, home) =>
  categoryPage
    ? home
      ? ['schoolLife', 'recruiting', 'transitions', 'finances', 'travel']
      : ['', 'schoolLife', 'recruiting', 'transitions', 'finances', 'travel']
    : ['', 'podcastEpisode', 'blogPost', 'libraryResource', 'eggStories'];
