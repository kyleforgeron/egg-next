import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const NavBar = ({ pages, siteIdentity }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/news/${query}`);
  };
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
          <form className="search" {...{ onSubmit }}>
            <input
              type="text"
              placeholder="Search news articles"
              onChange={(e) => setQuery(e.target.value)}
              className="search-bar"
            />
            <input type="submit" value="Go" className="search-button" />
          </form>
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

export default NavBar;
