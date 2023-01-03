import React from 'react';
import UnderConstruction from '../../components/layout/UnderConstruction';

export interface SalesMainProps {}

const SalesMain: React.FC<SalesMainProps> = () => {
  return (
    <div className="flex flex-1 flex-col">
      <UnderConstruction />
    </div>
  );
};

export default SalesMain;
