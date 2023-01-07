import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from './MobileMenu.module.scss';
import * as Close from 'assets/close.svg';

const MobileMenu = ({ open, onClose, pages }) => {
  return (
    open && (
      <aside className={style['modal']}>
        <div className={style['content']}>
          <button className={style['close-button']} onClick={onClose}>
            <Image alt="close" src={Close} />
          </button>
          <div className={style['links']}>
            {pages
              ?.sort((a, b) => a.fields.navIndex - b.fields.navIndex)
              .map(page => {
                if (page.fields.navIndex > 0)
                  return (
                    <Link href={`/${page.fields.slug}`} key={page.fields.slug}>
                      {page.fields.title}
                    </Link>
                  );
              })}
          </div>
        </div>
      </aside>
    )
  );
};

export default MobileMenu;
