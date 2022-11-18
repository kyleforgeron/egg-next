import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './SearchBar.module.scss';

const SearchBar = ({ variant, buttons, query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={buttons.includes(query) ? '' : query}
      onChange={e => setQuery(e.target.value)}
      className={classNames(style['search-bar'], {
        [style[`search-bar--${variant}`]]: !!variant,
      })}
    />
  );
};

SearchBar.defaultProps = {
  variant: '',
  buttons: [''],
};

SearchBar.propTypes = {
  variant: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.string),
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default SearchBar;
