import React from 'react';
import {base64toDataUrl} from '@app/helpers/files';

export interface PlaceholderImageProps {
  alt?: string;
  base64string?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({alt, base64string}) => {
  return (
    <div className="placeholder__img-container">
      {base64string ? (
        <img
          src={base64toDataUrl(base64string)}
          alt={alt || 'some-image'}
          className="w-full h-full"
        />
      ) : (
        <div className="placeholder__img"></div>
      )}
    </div>
  );
};

export default PlaceholderImage;
