import animationData from '../../animations/loadinganimation.json';
import React from 'react';
import Lottie from 'lottie-react';

const LoadingAnimation = ({ width, height }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} width={width} height={height} />;
};

export default LoadingAnimation;