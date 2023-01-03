import React from 'react';
import {getAlerts, ReeferAlert} from '@app/services/mapOn/reefer';
import {FsxTable} from '@app/components/common';
import {GridColumn} from '@app/helpers/types';

export interface TabAlertsProps {}

const columns: GridColumn[] = [
  {field: 'car_id', title: 'Unit ID'},
  {field: 'last_data_gmt', title: 'Last Data Update'},
  {field: 'current_flags', title: 'Current Flags'},
  {field: 'current_flags_gmt', title: 'Current Flags Update'},
];

const TabAlerts: React.FC<TabAlertsProps> = () => {
  const [reeferAlerts, setReeferAlerts] = React.useState<ReeferAlert[]>();

  React.useEffect(() => {
    getAlerts().then(response => response.data.data && setReeferAlerts(response.data.data?.alerts));
  }, []);

  return <FsxTable className="flex-grow" data={reeferAlerts} columns={columns} />;
};

export default TabAlerts;
