import React from 'react';
import UnderConstruction from '../../components/layout/UnderConstruction';

export interface FinanceMainProps {}

const FinanceMain: React.FC<FinanceMainProps> = () => {
  return (
    <div className="flex flex-1 flex-col">
      <UnderConstruction />
    </div>
  );
};

export default FinanceMain;
