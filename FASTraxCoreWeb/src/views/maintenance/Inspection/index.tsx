import {FsxGrid, Loader} from '@app/components/common';
import GridToolbar, {ViewOptionTypes} from '@app/components/common/GridToolbar';
import GridToolbarCounter, {counterColors} from '@app/components/common/GridToolbarCounter';

import {Confirm} from '@app/components/common/Alert';
import {FsxGridExcelExportRef} from '@app/components/common/FsxGrid';
import FsxUri from '@app/helpers/endpoints';
import {GridColumn} from '@progress/kendo-react-grid';
import {GridRowDoubleClickEvent} from '@progress/kendo-react-grid/dist/npm/interfaces/events';
import GridToolbarItem from '@app/components/common/GridToolbar/GridToolbarItem';
import {MaintenanceInspection as InspectionPermission} from '@app/helpers/permissions/action.key';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import {filter} from 'lodash';
import httpService from '@app/services/http.service';
import {useHistory} from 'react-router-dom';
import {useInspectionSummary} from '@app/services/maintenance/inspection.service';
import usePermissions from '@app/hooks/usePermisions';
import {useRadialMenu} from '@app/hooks/useRadialMenu';

export interface MaintenanceInspectionProps {}

const MaintenanceInspection: React.FC<MaintenanceInspectionProps> = () => {
  let history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [viewOption, setViewOption] = React.useState<keyof ViewOptionTypes>();

  const {hasPermission} = usePermissions();

  const radialMenu = useRadialMenu({rerenderDelayMS: 100});

  const {data: inspectionSummaries, isLoading, refetch} = useInspectionSummary();

  const [rowSelected, setRowSelected] = React.useState('');

  const getRowSelectedAssetType = (): string => rowSelected.split('_')[0];

  const getRowSelectedInspectionId = (): string => rowSelected.split('_')[2];

  const getRowSelectedInspectionNumber = (): string => rowSelected.split('_')[1];

  const handleUpdate = () => {
    if (rowSelected)
      history.push(
        `/app/maintenance/inspection/${getRowSelectedAssetType()}s/${getRowSelectedInspectionId()}`,
      );
  };

  const handleDelete = () => {
    if (rowSelected)
      Confirm({
        title: 'Confirm Action',
        text: `Confirm deletion of inspection ${getRowSelectedInspectionNumber()}`,
        icon: 'question',
        showCancelButton: true,
        onConfirm: async () => {
          await httpService.delete(
            `${
              FsxUri.maintenance.base
            }/inspections/inspection${getRowSelectedAssetType()}/${getRowSelectedInspectionId()}`,
          );
          setRowSelected('');
          refetch();
        },
      });
  };

  const handleRowDoubleClick = (event: GridRowDoubleClickEvent) => {
    const assetType = stringFormatter(event.dataItem.category);
    const inspectionId = event.dataItem.inspectionId;
    history.push(`/app/maintenance/inspection/${assetType}s/${inspectionId}`);
  };

  const hasGeneralAssetNew = hasPermission(InspectionPermission.GeneralAssetNew);
  const hasComponentNew = hasPermission(InspectionPermission.ComponentNew);
  const hasVehicleNew = hasPermission(InspectionPermission.VehicleNew);
  const hasGeneralAssetEdit = hasPermission(InspectionPermission.GeneralAssetEdit);
  const hasComponentEdit = hasPermission(InspectionPermission.ComponentEdit);
  const hasVehicleEdit = hasPermission(InspectionPermission.VehicleEdit);
  const hasGeneralAssetDelete = hasPermission(InspectionPermission.GeneralAssetEdit);
  const hasComponentDelete = hasPermission(InspectionPermission.ComponentEdit);
  const hasVehicleDelete = hasPermission(InspectionPermission.VehicleEdit);

  const initialMenu: RadialItem[] = [
    {title: 'View', icon: 'visibility-visible'},
    {
      title: 'Create',
      icon: 'add',
      disabled: !hasGeneralAssetNew && !hasComponentNew && !hasVehicleNew,
      children: [
        {
          title: 'Vehicle',
          icon: 'truck',
          disabled: !hasVehicleNew,
          onClick: () => history.push('/app/maintenance/inspection/vehicles/new'),
        },
        {
          title: 'Components',
          icon: 'stocks',
          disabled: !hasComponentNew,
          onClick: () => history.push('/app/maintenance/inspection/components/new'),
        },
        {
          title: 'General Asset',
          icon: 'asset',
          disabled: !hasGeneralAssetNew,
          onClick: () => history.push('/app/maintenance/inspection/generalassets/new'),
        },
      ],
    },
    {
      title: 'Update',
      icon: 'edit',
      onClick: handleUpdate,
      disabled: !hasGeneralAssetEdit && !hasComponentEdit && !hasVehicleEdit,
    },
    {
      title: 'Delete',
      icon: 'trash',
      onClick: handleDelete,
      disabled: !hasGeneralAssetDelete && !hasComponentDelete && !hasVehicleDelete,
    },
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel', onClick: () => gridExcelExportRef.current?.excelExport()},
  ];

  React.useEffect(() => {
    radialMenu.generate(initialMenu);
  }, [radialMenu, initialMenu, rowSelected]);

  const gridExcelExportRef = React.useRef<FsxGridExcelExportRef>();

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-shrink">
        <GridToolbar
          options={['Summary', 'PerRecord']}
          defaultView="Summary"
          onViewOptionsChange={e => setViewOption(e.value)}>
          <GridToolbarItem.Right>
            <GridToolbarCounter
              className="mr-4"
              title="Open"
              color={counterColors.portage}
              value={
                filter(inspectionSummaries?.data, summary => summary.maintenanceStatus === 'Open')
                  .length
              }
            />
            <GridToolbarCounter
              className="mr-4"
              title="For Approval"
              color={counterColors.glacier}
              value={
                filter(
                  inspectionSummaries?.data,
                  summary => summary.maintenanceStatus === 'Pending',
                ).length
              }
            />
            <GridToolbarCounter
              title="In-Progress"
              color={counterColors.chardonnay}
              value={
                filter(
                  inspectionSummaries?.data,
                  summary => summary.maintenanceStatus === 'In-Progress',
                ).length
              }
            />
          </GridToolbarItem.Right>
        </GridToolbar>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-grow">
          <FsxGrid
            className="h-full"
            sortable
            pageable
            data={inspectionSummaries?.data}
            onRowClick={event =>
              setRowSelected(
                `${stringFormatter(event.dataItem.category)}_${event.dataItem.inspectionNumber}_${
                  event.dataItem.inspectionId
                }`,
              )
            }
            onRowDoubleClick={handleRowDoubleClick}
            gridExcelExportRef={{ref: gridExcelExportRef, fileName: 'Inspection Summary'}}>
            <GridColumn
              field="inspectionNumber"
              title="Inspection Number"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="maintenanceStatus"
              title="Status"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="assetId"
              title="Asset ID"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="vinSerialNumber"
              title="VIN / Serial No."
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="category"
              title="Category"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
            <GridColumn field="dateIssued" title="Date Issued" />
            {/* <GridColumn field="department" title="Department" filter={'text'}
            columnMenu={KGridMenuFilter}/> */}
            <GridColumn
              field="location"
              title="Location"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="createdBy"
              title="Created By"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="lastUpdate"
              title="Last Update"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
          </FsxGrid>
        </div>
      )}
    </div>
  );
};

const stringFormatter = (text: string): string => text.split(' ').join('').toLowerCase();

export default React.memo(MaintenanceInspection);
