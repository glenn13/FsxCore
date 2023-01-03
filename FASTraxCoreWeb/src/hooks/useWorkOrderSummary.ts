import React from 'react';
import {GridColumn} from '../helpers/types';
import {RadialItem} from '../store/app/types';
import {useRadialMenu, RadialMenuProps} from './useRadialMenu';

export type UseWorkOrderSummaryProps = RadialMenuProps & {
  form?: boolean;
};

export interface WorkOrderSummaryRadialMenuProps {
  handleNew?: Function;
  handleUpdate?: Function;
  handleDelete?: Function;
}

const generalAssetColumns: GridColumn[] = [
  {field: 'workOrderNo', title: 'Work Order No.'},
  {field: 'workOrderStatus', title: 'Status'},
  {field: 'assetRefId', title: 'Asset ID'},
  {field: 'vinSerialNo', title: 'VIN / Serial No.'},
  {field: 'woDateIssued', title: 'WO Date Issued', type: 'date'},
  {field: 'maintenanceDepartment', title: 'Department'},
  {field: 'maintenanceLocation', title: 'Location'},
  {field: 'workOrderType', title: 'Type'},
];

const vehicleColumns: GridColumn[] = [
  {field: 'workOrderNo', title: 'Work Order No.'},
  {field: 'workOrderStatus', title: 'Status'},
  {field: 'assetRefId', title: 'Asset ID'},
  {field: 'vinSerialNo', title: 'VIN'},
  {field: 'woDateIssued', title: 'WO Date Issued', type: 'date'},
  {field: 'maintenanceDepartment', title: 'Department'},
  {field: 'maintenanceLocation', title: 'Location'},
  {field: 'workOrderType', title: 'Type'},
];

const componentColumns: GridColumn[] = [
  {field: 'workOrderNo', title: 'Work Order No.'},
  {field: 'workOrderStatus', title: 'Status'},
  {field: 'assetRefId', title: 'Asset ID'},
  {field: 'vinSerialNo', title: 'VIN / Serial No.'},
  {field: 'woDateIssued', title: 'WO Date Issued', type: 'date'},
  {field: 'maintenanceDepartment', title: 'Department'},
  {field: 'maintenanceLocation', title: 'Location'},
  {field: 'workOrderType', title: 'Type'},
];

export const useWorkOrderSummary = ({
  form = true,
  rerenderDelayMS,
}: UseWorkOrderSummaryProps = {}) => {
  const radialMenu = useRadialMenu({rerenderDelayMS});

  const formRadialItems = React.useCallback(
    ({
      handleNew,
      handleUpdate,
      handleDelete,
    }: WorkOrderSummaryRadialMenuProps = {}): RadialItem[] => [
      {title: 'View', icon: 'visibility-visible'},
      {title: 'Create', icon: 'add', onClick: handleNew},
      {title: 'Update', icon: 'edit', onClick: handleUpdate},
      {title: 'Delete', icon: 'trash', onClick: handleDelete},
      {title: 'Print', icon: 'print'},
      {title: 'Export', icon: 'excel'},
    ],
    [],
  );

  const generateFormRadialItems = React.useCallback(
    (props: WorkOrderSummaryRadialMenuProps = {}) => radialMenu.generate(formRadialItems(props)),
    [radialMenu, formRadialItems],
  );

  return React.useMemo(
    () => ({
      generateRadialMenu: {
        form: generateFormRadialItems,
      },
      grid: {
        generalAssetColumns,
        vehicleColumns,
        componentColumns,
      },
    }),
    [generateFormRadialItems],
  );
};
