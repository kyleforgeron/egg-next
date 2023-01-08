import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'utils/useMediaQuery';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import * as HamburgerWhite from 'assets/hamburger-white.svg';
import * as HamburgerRed from 'assets/hamburger-red.svg';
import style from './NavBar.module.scss';
import MobileMenu from 'components/MobileMenu';
import { useRouter } from 'next/router';

const NavBar = ({ pages, siteIdentity }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const [navOpen, isNavOpen] = useState(false);
  const [deep, isDeep] = useState(false);

  useEffect(() => {
    if (navOpen) {
      isNavOpen(false);
    }
  }, [router.asPath]); //eslint-disable-line

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
              width={isMobile ? '175' : '250'}
              height={isMobile ? '42' : '60'}
            />
          </Link>
          {isMobile ? (
            <button
              className={classNames(style['nav-mobile'], {
                [style['nav-mobile--deep']]: deep,
              })}
              onClick={() => isNavOpen(!navOpen)}
            >
              <Image alt="menu" src={deep? HamburgerRed : HamburgerWhite} />
            </button>
          ) : (
            <div
              className={classNames(style['nav-links'], {
                [style['nav-links--deep']]: deep,
              })}
            >
              {pages
                ?.sort((a, b) => a.fields.navIndex - b.fields.navIndex)
                .map(page => {
                  if (page.fields.navIndex > 0)
                    return (
                      <Link
                        href={`/${page.fields.slug}`}
                        key={page.fields.slug}
                      >
                        {page.fields.title}
                      </Link>
                    );
                })}
            </div>
          )}
        </div>
      </nav>
      <MobileMenu open={navOpen} onClose={() => isNavOpen(false)} {...{ pages }} />
    </header>
  );
};

NavBar.propTypes = {
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
};

export default NavBar;
