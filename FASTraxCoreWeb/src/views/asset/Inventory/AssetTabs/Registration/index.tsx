import React from 'react';
import RegistrationDetails from './Details';
import AssetOwnership from './AssetOwnership';
import WarrantyDetails from './WarrantyDetails';
import Heading from '@app/views/common/Heading';

export interface AssetRegistrationProps {}

const AssetRegistration: React.FC<AssetRegistrationProps> = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full mb-8">
        <Heading title="Asset Purchase, Ownership and Depreciation Information" />
        <AssetOwnership />
      </div>
      <div className="w-full mb-8">
        <Heading title="Warranty Details" />
        <WarrantyDetails />
      </div>
      <div className="w-full mb-8">
        <Heading title="Registration Details" />
        <RegistrationDetails />
      </div>
    </div>
  );
};

export default React.memo(AssetRegistration);
