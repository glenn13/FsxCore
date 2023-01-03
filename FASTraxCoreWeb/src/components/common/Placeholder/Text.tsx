import React from 'react';

export interface PlaceholderTextProps {}

const PlaceholderText: React.FC<PlaceholderTextProps> = () => {
  return (
    <div className="placeholder__content">
      <div className="placeholder__stripe placeholder__small-stripe"></div>
      <div className="placeholder__stripe placeholder__medium-stripe"></div>
      <div className="placeholder__stripe placeholder__long-stripe"></div>
    </div>
  );
};

export default PlaceholderText;
