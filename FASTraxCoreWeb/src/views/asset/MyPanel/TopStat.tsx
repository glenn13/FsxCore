import React from 'react';
import clx from 'classnames';

export interface TopStatProps {
  title: string;
  value: string;
  percent?: boolean;
}

const TopStat: React.FC<TopStatProps> = ({title, value, percent}) => {
  return (
    <div className="flex flex-col items-center justify-center py-5 card-box">
      <h2 className="title">{title}</h2>
      <span className={clx('text-4xl', {percent})}>{value}</span>
    </div>
  );
};

export default TopStat;
