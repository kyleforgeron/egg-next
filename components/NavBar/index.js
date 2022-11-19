import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import style from './NavBar.module.scss';

const NavBar = ({ pages, siteIdentity }) => {
  const [deep, isDeep] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', e => {
      const scrollCheck = window.scrollY > 60;
      if (scrollCheck && !deep) {
        isDeep(true);
      }
      if (!scrollCheck && deep) {
        isDeep(false);
      }
    });
  }, [deep]);

  return (
    <header>
      <nav
        className={classNames(style.nav, {
          [style['nav--deep']]: deep,
        })}
      >
        <div className={style['nav-contents']}>
          <Link href="/">
            <Image
              className={style['brand-logo']}
              src={`https:${siteIdentity[0].fields.logo.fields.file.url}`}
              alt={`${siteIdentity[0].fields.logo.fields.title}`}
              loading="lazy"
              width="100"
              height="60"
            />
          </Link>
          {/*
          <h2 className={style['brand-name']}>
            {siteIdentity[0].fields.brandName}
          </h2>
          */}
          <div
            className={classNames(style['nav-links'], {
              [style['nav-links--deep']]: deep,
            })}
          >
            {pages?.map(page => {
              if (page.fields.navIndex > 0)
                return (
                  <Link href={`/${page.fields.slug}`} key={page.fields.slug}>
                    {page.fields.title}
                  </Link>
                );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
};

export default NavBar;
