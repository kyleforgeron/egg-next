import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SearchBar } from 'components';
import { getButtonTitle } from 'components/CardBlock/constants';
import { buttons } from './constants';
import style from './CardTabs.module.scss';

const CardTabs = ({ home, categoryPage, tag, setTag, query, setQuery }) => {
  return (
    <>
      <nav className={style.tabs}>
        <div className={style['tabs-contents']}>
          {buttons(categoryPage, home).map(button => (
            <button
              className={classNames(style['tabs-button'], {
                [style['tabs-button--selected']]: tag === button,
              })}
              onClick={() => setTag(button)}
              key={button}
            >
              {getButtonTitle(button)}
            </button>
          ))}
        </div>
        <div className={style['tabs-search']}>
          <SearchBar
            variant="card"
            buttons={buttons(categoryPage)}
            {...{ query, setQuery }}
          />
        </div>
      </nav>
    </>
  );
};

CardTabs.propTypes = {
  categoryPage: PropTypes.bool.isRequired,
  tag: PropTypes.string.isRequired,
  setTag: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default CardTabs;
