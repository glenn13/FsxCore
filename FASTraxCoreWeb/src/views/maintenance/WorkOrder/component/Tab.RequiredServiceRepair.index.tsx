import React from 'react';
import AdditionalCharge from './Tab.RequiredServiceRepair.AdditionalCharge';
import Heading from '@app/views/common/Heading';

export interface ServiceRepairProps {}

const ServiceRepair: React.FC<ServiceRepairProps> = () => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Additional Charge" />
      <AdditionalCharge />
    </div>
  );
};

export default React.memo(ServiceRepair);
