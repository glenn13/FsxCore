import React from 'react';
import ServiceRepair from './Tab.Selection.Repairs';

export interface SelectionRepairProps {}

const SelectionRepair: React.FC<SelectionRepairProps> = () => {
  return (
    <div className="w-full p-4 mb-8">
      <ServiceRepair />
    </div>
  );
};

export default React.memo(SelectionRepair);
