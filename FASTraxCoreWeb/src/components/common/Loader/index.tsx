import Lottie from 'react-lottie';
import React from 'react';

const preloaderData = require('./preloader2.json');

export interface LoaderProps {
  text?: string;
  textColor?: string;
  fullHeight?: boolean;
  fullWidth?: boolean;
}

const Loader: React.FC<LoaderProps> = ({text, textColor, fullHeight = true, fullWidth = true}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: preloaderData,
  };

  const isFullHeight = fullHeight ? 'h-full' : '';
  const isFullWidth = fullWidth ? 'w-full' : '';

  return (
    <div className={`flex items-center justify-center ${isFullHeight} ${isFullWidth}`}>
      <div>
        <Lottie options={defaultOptions} height={60} isClickToPauseDisabled />
        <h3 className="text-center" style={{color: textColor || ''}}>
          {text}
        </h3>
      </div>
    </div>
  );
};

export default Loader;
