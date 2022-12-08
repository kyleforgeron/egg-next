import React, { useState } from 'react';
import style from './MobileWarn.module.scss';

const MobileWarn = () => {
  const [open, isOpen] = useState(true);
  return open && (
    <aside className={style['modal']}>
      <div className={style['background']} onClick={() => isOpen(false)} />
      <div className={style['content']}>
        <button className={style['close-button']} onClick={() => isOpen(false)}>Close</button>
        <h3>Our mobile experience is still in development. Please visit us on a computer for a better experience in the meantime!</h3>
      </div>
    </aside>
  )
};

export default MobileWarn;
