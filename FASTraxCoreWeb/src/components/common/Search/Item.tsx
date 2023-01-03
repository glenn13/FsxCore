import React from 'react';
import clx from 'classnames';

export interface SearchItemProps {
  shadow?: boolean;
  bgWhite?: boolean;
  sameAsPlaceHolderSize?: boolean;
}

const SearchItem: React.FC<SearchItemProps> = ({
  children,
  shadow,
  bgWhite,
  sameAsPlaceHolderSize,
}) => {
  return (
    <div
      className={clx(`h-32 w-full border border-gray-200`, {
        shadow,
        'bg-white': bgWhite,
        placeholder__container: sameAsPlaceHolderSize,
      })}>
      {children}
    </div>
  );
};

export default SearchItem;
