import React from 'react';
import {GridColumn} from '../helpers/types';
import {RadialItem} from '../store/app/types';
import {useRadialMenu, RadialMenuProps} from './useRadialMenu';

export type UseEstimateSummaryProps = RadialMenuProps & {
  form?: boolean;
};

export interface EstimateSummaryRadialMenuProps {
  handleNew?: Function;
  handleUpdate?: Function;
  handleDelete?: Function;
}

const summaryColumns: GridColumn[] = [
  {field: 'estimationNumber', title: 'Estimation No.'},
  {field: 'estimationStatus', title: 'Status'},
  {field: 'assetRefId', title: 'Asset ID'},
  {field: 'estimationType', title: 'Type'},
  {field: 'dateRaised', title: 'Date Raised', format: '{0:dd-MMM-yyyy}'},
  {field: 'maintenanceLocation', title: 'Location'},
];

export const useEstimateSummary = ({rerenderDelayMS}: UseEstimateSummaryProps = {}) => {
  const radialMenu = useRadialMenu({rerenderDelayMS});

  const formRadialItems = React.useCallback(
    ({
      handleNew,
      handleUpdate,
      handleDelete,
    }: EstimateSummaryRadialMenuProps = {}): RadialItem[] => [
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
    (props: EstimateSummaryRadialMenuProps = {}) => radialMenu.generate(formRadialItems(props)),
    [radialMenu, formRadialItems],
  );

  return React.useMemo(
    () => ({
      generateRadialMenu: {
        form: generateFormRadialItems,
      },
      grid: {
        summaryColumns,
      },
    }),
    [generateFormRadialItems],
  );
};
