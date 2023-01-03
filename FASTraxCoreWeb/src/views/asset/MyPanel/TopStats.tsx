import React from 'react';
import TopStat from './TopStat';
import {getGeneralAssetItemGroupsForGrid} from '@app/services/asset/register/generalasset.service';
import {getVehicleSummaryForGrid} from '@app/services/asset/register/vehicle.service';
import {getComponentSummaryForGrid} from '@app/services/asset/register/component.service';
import FsxCounter from '@app/components/common/FsxCounter';
import {getRegisterAssetCount} from '@app/services/asset/assets.service';

export interface TopStatsProps {}

const TopStats: React.FC<TopStatsProps> = () => {
  const [registerAssetCount, setRegisterAssetCount] = React.useState(0);

  React.useEffect(() => {
    getRegisterAssetCount().then(response => setRegisterAssetCount(response.data));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-2">
      {/* <TopStat
        title="Registered Asset Count"
        value={Number(parseFloat(registeredAssetCount).toFixed(2)).toLocaleString('en')}
      />
      <TopStat title="Overall Asset Value" value="25.12M" />
      <TopStat title="Asset Availability %" value="$ 0" percent />
      <TopStat title="Asset Usage %" value="0" percent /> */}
      <FsxCounter
        title="Registered Asset Count"
        value={Number(parseFloat(registerAssetCount.toString()).toFixed(2)).toLocaleString('en-US')}
        duration="0.5"
        icon="truck"></FsxCounter>
      <FsxCounter
        title="Overall Asset Value"
        value={Number(parseFloat('0').toFixed(2)).toLocaleString('en-US')}
        duration="0.5"
        icon="currency"
        currency></FsxCounter>
      <FsxCounter
        title="Asset Availability %"
        value={'0'}
        duration="0.5"
        icon="open-task"
        percent></FsxCounter>
      <FsxCounter
        title="Asset Usage %"
        value={'0'}
        duration="0.5"
        icon="report"
        percent></FsxCounter>
    </div>
  );
};

export default TopStats;
