import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {GridColumn} from '../helpers/types';
import {RadialItem} from '../store/app/types';
import {setErrors} from '../store/common/errors.reducer';
import {useRadialMenu, RadialMenuProps} from './useRadialMenu';
import {setImages} from '@app/store/asset/inventory/attachmentImages.reducer';
import {setDocuments} from '@app/store/asset/inventory/attachmentDocuments.reducer';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

const columns: GridColumn[] = [
  {field: 'serialNo', title: 'Serial No.'},
  {field: 'assetStatus.title', title: 'Asset Status'},
  {field: 'maintenanceStatus.title', title: 'Maintenance Status'},
  {field: 'assetType.title', title: 'Type'},
  {field: 'manufacturer.title', title: 'Manufacturer'},
  {field: 'model.title', title: 'Model'},
  {field: 'modelYear.title', title: 'Model Year'},
];

export type UseAssetProps = RadialMenuProps & {
  hasSelected?: boolean;
};

export interface AssetGridRadialMenuProps {
  handleNew?: Function;
  handleUpdate?: Function;
  handleDelete?: Function;
  handleDisposition?: Function;
  handleView?: Function;
}

export const useAsset = ({rerenderDelayMS, hasSelected}: UseAssetProps = {}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS});

    const handleCategoryChange = React.useCallback(
        (value: AssetCategoryEnum) => {
            if (value === AssetCategoryEnum.GeneralAsset) history.push('/app/asset/inventory/generals/new');
            if (value === AssetCategoryEnum.Vehicle) history.push('/app/asset/inventory/vehicles/new');
            if (value === AssetCategoryEnum.Component) history.push('/app/asset/inventory/components/new');
    },
    [history],
  );

  const gridRadialItems = React.useCallback(
    ({
      handleNew,
      handleUpdate,
      handleDelete,
      handleDisposition,
      handleView,
    }: AssetGridRadialMenuProps = {}): RadialItem[] => [
      {
        title: 'Issue Disposition',
        icon: 'trash',
        onClick: handleDisposition,
        disabled: !hasSelected,
      },
      {title: 'Issue Work Order', icon: 'report', disabled: !hasSelected},
      {title: 'Issue Inspection', icon: 'open-task', disabled: !hasSelected},
      {title: 'Delete', icon: 'trash', onClick: handleDelete, disabled: !hasSelected},
      {title: 'Update', icon: 'edit', onClick: handleUpdate, disabled: !hasSelected},
      {title: 'New', icon: 'add', onClick: handleNew},
      {title: 'View', icon: 'visibility-visible', onClick: handleView, disabled: !hasSelected},
      {title: 'Export', icon: 'excel'},
      {title: 'Print', icon: 'print'},
    ],
    [hasSelected],
  );

  const generateGridRadialItems = React.useCallback(
    (props: AssetGridRadialMenuProps = {}) => radialMenu.generate(gridRadialItems(props)),
    [radialMenu, gridRadialItems],
  );

  React.useEffect(
    () => () => {
      dispatch(setErrors({}));
      dispatch(setImages([]));
      dispatch(setDocuments([]));
    },
    [dispatch],
  );

  return React.useMemo(
    () => ({
      generateRadialMenu: {
        grid: generateGridRadialItems,
      },
      grid: {
        common: {
          columns,
        },
      },
      onSetCategory: handleCategoryChange,
    }),
    [generateGridRadialItems, handleCategoryChange],
  );
};
