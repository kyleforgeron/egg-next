import React from 'react';
import PropTypes from 'prop-types';
import style from './Video.module.scss';

const Video = ({ src }) => {
  return (
    <video
      className={style.video}
      controls
      controlsList="nofullscreen nodownload noplaybackrate"
    >
      <source src={src} />
    </video>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Video;
