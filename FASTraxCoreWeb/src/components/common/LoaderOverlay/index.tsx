import {Loader} from '..';
import React from 'react';
import styles from './LoaderOverlay.module.scss';

/**
 * Loader overlay container.
 */
const LoaderOverlay: React.VFC<
  {text?: string; textColor?: string} & React.HTMLAttributes<HTMLDivElement>
> = ({className, text, textColor, ...props}) => {
  return (
    <div {...props} className={`${styles['container']} ${className ? className : ''}`}>
      <Loader text={text} textColor={textColor} />
    </div>
  );
};

export default LoaderOverlay;
