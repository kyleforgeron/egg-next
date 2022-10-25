import React from "react";
import PropTypes from 'prop-types';
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

const NavBar = ({ pages, siteIdentity }) => {
  return (
    <header>
      <nav className="main-nav">
        <Link href="/">
          <a>
            <Image
              className="brand-logo"
              src={`https:${siteIdentity[0].fields.logo.fields.file.url}`}
              alt={`${siteIdentity[0].fields.logo.fields.title}`}
              loading="lazy"
              width="100"
              height="60"
              href="/"
            />
          </a>
        </Link>
        <h2 className="brand-name">{siteIdentity[0].fields.brandName}</h2>
        <span className="nav-links">
          <SearchBar />
          <Link href="/news" className="page-link">
            Top Stories
          </Link>
          {pages?.map((page) => {
            if (page.fields.navIndex > 0)
              return (
                <Link
                  href={`/${page.fields.slug}`}
                  key={page.fields.slug}
                  className="page-link"
                >
                  {page.fields.title}
                </Link>
              );
          })}
        </span>
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  pages: PropTypes.array.isRequired,
  siteIdentity: PropTypes.array.isRequired,
};

export default NavBar;
