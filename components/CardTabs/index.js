import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchBar } from 'components';
import style from './CardTabs.module.scss';
import classNames from 'classnames';

const CardTabs = ({ query, setQuery }) => {
  const buttons = [
    'community',
    'finances',
    'recruiting',
    'transitions',
    'school management',
    'travel',
  ];

  return (
    <nav className={style.tabs}>
      <span className={style['tabs-contents']}>
        {buttons.map(button => (
          <button
            className={classNames(style['tabs-button'], {
              [style['tabs-button--selected']]: query === button,
            })}
            onClick={() => setQuery(button)}
            key={button}
          >
            {button}
          </button>
        ))}
      </span>
      <SearchBar variant="card" {...{ buttons, query, setQuery }} />
    </nav>
  );
};

CardTabs.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default CardTabs;
