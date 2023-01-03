import React from 'react';
import TopStats from './MyPanel/TopStats';
import SideStats from './MyPanel/SideStats';
import AssetManagementTabs from './MyPanel/Tabs';

export interface AssetManagementProps {}

const AssetManagement: React.FC<AssetManagementProps> = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <TopStats />
      <br />
      <div className="flex flex-1 flex-row flex-wrap h-full">
        <div className="h-full flex-col lg:w-3/4">
          <AssetManagementTabs />
        </div>
        <div className="h-full flex-col lg:w-1/4 pl-2">
          <SideStats />
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;
