import React from 'react';
import UnderConstruction from '../../components/layout/UnderConstruction';

export interface StockMainProps {}

const StockMain: React.FC<StockMainProps> = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <UnderConstruction underConstruction />
    </div>
  );
};

export default StockMain;
