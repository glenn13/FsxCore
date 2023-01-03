import * as React from 'react';
import UnderConstruction from '../../components/layout/UnderConstruction';

export interface CustomerProps {}

const Customer: React.FC<CustomerProps> = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <UnderConstruction underConstruction />
    </div>
  );
};

export default Customer;
