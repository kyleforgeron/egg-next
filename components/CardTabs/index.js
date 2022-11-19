import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchBar } from 'components';
import style from './CardTabs.module.scss';
import classNames from 'classnames';

const CardTabs = ({ home, tag, setTag, query, setQuery }) => {
  const buttons = home ? [
    'community',
    'finances',
    'recruiting',
    'transitions',
    'school management',
    'travel',
  ] : [
    '',
    'podcastEpisode',
    'blogPost',
    'libraryResource',
    'goingGlobalStory',
  ];

  const getButtonTitle = label => {
    switch (label) {
      case '':
        return 'Everything';
      case 'podcastEpisode':
        return 'Podcast Episodes';
      case 'blogPost':
        return 'Blog Posts';
      case 'libraryResource':
        return 'Library Resources';
      case 'goingGlobalStory':
        return 'Going Global Stories';
      default:
        return '';
    }
  }

  return (
    <nav className={style.tabs}>
      <span className={style['tabs-contents']}>
        {buttons.map(button => (
          <button
            className={classNames(style['tabs-button'], {
              [style['tabs-button--selected']]: tag === button,
            })}
            onClick={() => setTag(button)}
            key={button}
          >
            {home ? button : getButtonTitle(button)}
          </button>
        ))}
      </span>
      <SearchBar variant="card" {...{ buttons, query, setQuery }} />
    </nav>
  );
};

CardTabs.propTypes = {
  home: PropTypes.bool.isRequired,
  tag: PropTypes.string.isRequired,
  setTag: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default CardTabs;
