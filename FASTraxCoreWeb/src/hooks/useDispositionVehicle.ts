import * as React from 'react';
import {User} from '@app/entities/catalog';
import {GridColumn} from './../helpers/types';
import {RadialItem} from './../store/app/types';
import Group from '@app/entities/hr/standard-entries/Group';
import {useRadialMenu, RadialMenuProps} from './useRadialMenu';
import { getApprovers , postApprover} from '@app/services/asset/disposition/approvers.service';


const columns: GridColumn[] = [
  {field: 'vehicle.assetRefId', title: 'Asset ID'},
  {field: 'vehicle.vin', title: 'VIN / Serial No.'},
  {field: 'dispositionType.title', title: 'Cause'},
  {field: 'vehicle.assetType.title', title: 'Type'},
  {field: 'vehicle.assetManufacturer.title', title: 'Manufacturer'},
  {field: 'vehicle.assetModel.title', title: 'Model'},
  {field: 'vehicle.assetModelYear', title: 'Year', type:'year'},
  {field: '', title: 'Plate No'},
  {field: 'vehicle.assetColor.title', title: 'Color'},
  {field: 'vehicle.vehicleSecondaryDetail.meterType.title', title: 'Meter Type'},
  {field: 'vehicle.vehicleSecondaryDetail.lastOdometerReading', title: 'Odometer Reading'},
  {field: '', title: 'Mile Conversion'},
];

export type UseDispositionVehicleProps = RadialMenuProps & {
  loadApprovers?: boolean;
};

export const useDispositionVehicle = ({loadApprovers, rerenderDelayMS}: UseDispositionVehicleProps = {}) => {
  const [group, setGroup] = React.useState<Group>();
  const radialMenu = useRadialMenu({rerenderDelayMS});

  const generateRadialMenu = React.useCallback(
    (radialMenuItems: RadialItem[]) => {
      if (radialMenuItems.length === 0) return;

      radialMenu.generate(radialMenuItems);
    },
    [radialMenu],
  );

  React.useEffect(() => {
    if (!loadApprovers) return;

    getApprovers().then(response => setGroup(response.data));
  }, [loadApprovers]);

  const addApprover = React.useCallback(
    async (user: User) => {
      if (!loadApprovers) return false;

      const response = await postApprover(user.id);

      if (!group || !group.groupUsers) return false;

      setGroup({...group, groupUsers: group.groupUsers && [...group.groupUsers, response.data]});

      return true;
    },
    [group, loadApprovers],
  );

  return React.useMemo(
    () => ({
      columns,
      group,
      addApprover,
      generateRadialMenu,
    }),
    [group, addApprover, generateRadialMenu],
  );
};
