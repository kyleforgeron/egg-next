import React, { useState } from 'react';
import style from './MobileWarn.module.scss';

const MobileWarn = () => {
  const [open, isOpen] = useState(true);
  return (
    open && (
      <aside className={style['modal']}>
        <div className={style['background']} onClick={() => isOpen(false)} />
        <div className={style['content']}>
          <button
            className={style['close-button']}
            onClick={() => isOpen(false)}
          >
            Close
          </button>
          <h3>
            {`We're sorry, but the Mobile version of Educators Going Global is not quite ready yet. Please check back here at the end of January.`}
            <br />
            <br />
            {`Meanwhile, please visit us on your laptop!`}
          </h3>
        </div>
      </aside>
    )
  );
};

export default MobileWarn;
