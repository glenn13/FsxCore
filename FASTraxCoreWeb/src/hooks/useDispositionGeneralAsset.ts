import * as React from 'react';
import {User} from '@app/entities/catalog';
import {GridColumn} from './../helpers/types';
import {RadialItem} from './../store/app/types';
import Group from '@app/entities/hr/standard-entries/Group';
import {useRadialMenu, RadialMenuProps} from './useRadialMenu';
import { getApprovers , postApprover} from '@app/services/asset/disposition/approvers.service';
import moment from 'moment';

const columns: GridColumn[] = [
  {field: 'generalAsset.assetRefId', title: 'Asset ID'},
  {field: 'generalAsset.serialNo', title: 'Serial No.'},
  {field: 'dispositionType.title', title: 'Cause'},
  {field: 'generalAsset.assetType.title', title: 'Type'},
  {field: 'generalAsset.assetManufacturer.title', title: 'Manufacturer'},
  {field: 'generalAsset.assetModel.title', title: 'Model'},
  {field: 'generalAsset.assetModelYear', title: 'Year', type:'year'},
  {field: 'generalAsset.assetColor.title', title: 'Color'},
];

export type UseDispositionGeneralAssetProps = RadialMenuProps & {
  loadApprovers?: boolean;
};

export const useDispositionGeneralAsset = ({loadApprovers, rerenderDelayMS}: UseDispositionGeneralAssetProps = {}) => {
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
