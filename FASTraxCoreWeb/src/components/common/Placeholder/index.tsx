import React from 'react';
import clx from 'classnames';
import PlaceholderText from './Text';
import PlaceholderImage from './Image';

import './styles.scss';

export interface PlaceholderProps {
  count?: number;
  hasText?: boolean;
  hasImage?: boolean;
  isLoading?: boolean;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  count = 1,
  hasText = true,
  hasImage = true,
  isLoading = false,
}) => {
  return (
    <>
      {Array.from({length: count}, (_, i) => (
        <div key={i} className={clx('placeholder__container', {placeholder__loading: isLoading})}>
          {hasImage && <PlaceholderImage />}
          {hasText && <PlaceholderText />}
        </div>
      ))}
    </>
  );
};

export default Placeholder;
