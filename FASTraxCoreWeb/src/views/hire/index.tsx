import React from 'react';
import UnderConstruction from '../../components/layout/UnderConstruction';

export interface AssetHireMainProps {}

const AssetHireMain: React.FC<AssetHireMainProps> = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <UnderConstruction underConstruction />
    </div>
  );
};

export default AssetHireMain;
