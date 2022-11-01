import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import style from './SearchBar.module.scss';

const SearchBar = ({ variant, onCardSubmit }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const onNytSubmit = e => {
    e.preventDefault();
    router.push(`/news/${query}`);
  };
  return (
    <form
      className={classNames(style.search, {
        [style[`search--${variant}`]]: !!variant,
      })}
      onSubmit={e =>
        variant === 'card' ? onCardSubmit(e, query) : onNytSubmit(e)
      }
    >
      <input
        type="text"
        placeholder={
          variant === 'card' ? 'Filter content' : 'Search news articles'
        }
        onChange={e => setQuery(e.target.value)}
        className={classNames(style['search-bar'], {
          [style[`search-bar--${variant}`]]: !!variant,
        })}
      />
      <input
        type="submit"
        value={variant === 'card' ? 'Apply' : 'Go'}
        className={classNames(style['search-button'], {
          [style[`search-button--${variant}`]]: !!variant,
        })}
      />
    </form>
  );
};

SearchBar.defaultProps = {
  variant: '',
  onCardSubmit: null,
};

SearchBar.propTypes = {
  variant: PropTypes.string,
  onCardSubmit: PropTypes.func,
};

export default SearchBar;
