import React from 'react';
import SearchItem from './Item';
import NotFound from './NotFound';
import Placeholder from '../Placeholder';
import {isValidChildren} from '@app/helpers/types';

export interface SearchProps {
  columns?: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
}

const Search: React.FC<SearchProps> = ({columns = 1, children}) => {
  const isValid = React.useMemo(
    () => children && isValidChildren(children, SearchItem, Placeholder, NotFound),
    [children],
  );

  if (!isValid) throw new Error('Invalid children!');

  if (!children || (Array.isArray(children) && children.length === 0))
    return <div>Empty Search</div>;

  return (
    <div className={`gap-4 grid grid-cols-${columns} w-${columns === 1 ? '1/2' : 'full'}`}>
      {children}
    </div>
  );
};

export default {
  Container: Search,
  Item: SearchItem,
  NotFound: NotFound,
};
