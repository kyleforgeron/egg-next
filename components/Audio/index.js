import React from 'react';
import PropTypes from 'prop-types';
import style from './Audio.module.scss';

const Audio = ({ src }) => {
  return (
    <div className={style.audio}>
      <audio
        className={style['audio-player']}
        controls
        controlsList="nofullscreen nodownload noplaybackrate"
      >
        <source src={src} />
      </audio>
    </div>
  );
};

Audio.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Audio;
