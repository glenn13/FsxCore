import React from 'react';
import clx from 'classnames';

export interface HeadingProps {
  title: string;
  shadow?: boolean;
}

const Heading: React.FC<HeadingProps> = ({title, shadow}) => {
  return (
    <label
      className={clx(`text-base tracking-wider uppercase h-12 w-full flex items-center px-4 py-2`, {
        shadow: shadow && 'shadow z-10',
      })}
      style={{backgroundColor: '#F2F2F2'}}>
      {title}
    </label>
  );
};

export default React.memo(Heading);
