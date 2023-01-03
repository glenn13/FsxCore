import React from 'react';
import clx from 'classnames';

export interface GridProps {
  cols?: number;
  gap?: number;
}

const Grid: React.FC<GridProps> = ({gap = 0, cols = 1, children}) => {
  return <div className={clx(`grid grid-cols-${cols} gap-${gap}`)}>{children}</div>;
};

export default Grid;
