import React from 'react';
import AssetOwnershipForm from './Form';
import DepreciationGrid from './DepreciationGrid';

export interface AssetOwnershipProps {}

const AssetOwnership: React.FC<AssetOwnershipProps> = () => {
  return (
    <div className="flex flex-wrap px-5">
      <div className="lg:w-2/5 md:w-2/5">
        <AssetOwnershipForm />
      </div>
      <div className="lg:w-3/5 md:w-3/5">
        <DepreciationGrid />
      </div>
    </div>
  );
};

export default React.memo(AssetOwnership);
