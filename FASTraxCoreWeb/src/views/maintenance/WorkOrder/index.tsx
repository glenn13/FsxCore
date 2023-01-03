import {FsxTable, Loader} from '@app/components/common';
import React, {useRef} from 'react';
import {
  deleteWorkOrderBOM,
  deleteWorkOrderComponent,
  deleteWorkOrderGeneralAsset,
  deleteWorkOrderVehicle,
  useWorkOrderSummaryForGrid,
} from '@app/services/maintenance/workorder.service';
import {FsxGridExcelExportRef} from '@app/components/common/FsxGrid';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import {RadialItem} from '@app/store/app/types';
import {WORKORDERCATEGORYTYPE} from '@app/entities/maintenance/workorder/WorkOrderCategoryType';
import WorkOrderSummary from '@app/entities/maintenance/workorder/WorkOrderSummary';
import WorkOrderViewOption from './ViewOptions';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {useWorkOrderSummary} from '@app/hooks/useWorkOrderSummary';
import moment from 'moment';

export interface MaintenanceWorkOrderProps {}

const MaintenanceWorkOrder: React.FC<MaintenanceWorkOrderProps> = () => {
  const history = useHistory();

  const {data: workOrderSummaryForGrid, isLoading, fetchMore} = useWorkOrderSummaryForGrid();
  const [selected, setSelected] = React.useState<WorkOrderSummary>();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});

  const gridExcelExportRef = useRef<FsxGridExcelExportRef>();

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const workOrder = useWorkOrderSummary();

  const handleUpdate = React.useCallback(() => {
    switch (selected?.workOrderCategoryTypeId) {
      case WORKORDERCATEGORYTYPE.BOM:
        history.push(`/app/maintenance/workorder/${selected.id}/bom`);
        break;
      case WORKORDERCATEGORYTYPE.COMPONENT:
        history.push(`/app/maintenance/workorder/${selected.id}/component`);
        break;
      case WORKORDERCATEGORYTYPE.GENERALASSET:
        history.push(`/app/maintenance/workorder/${selected.id}/generalasset`);
        break;
      case WORKORDERCATEGORYTYPE.VEHICLE:
        history.push(`/app/maintenance/workorder/${selected.id}/vehicle`);
        break;
    }
  }, [selected, history]);

  const handleDelete = () => {
    switch (selected?.workOrderCategoryTypeId) {
      case WORKORDERCATEGORYTYPE.BOM:
        deleteWorkOrderBOM(selected.id).then(() => fetchMore());
        break;
      case WORKORDERCATEGORYTYPE.COMPONENT:
        deleteWorkOrderComponent(selected.id).then(() => fetchMore());
        break;
      case WORKORDERCATEGORYTYPE.GENERALASSET:
        deleteWorkOrderGeneralAsset(selected.id).then(() => fetchMore());
        break;
      case WORKORDERCATEGORYTYPE.VEHICLE:
        deleteWorkOrderVehicle(selected.id).then(() => fetchMore());
        break;
    }
  };

  const initialMenu: RadialItem[] = [
    {title: 'View', icon: 'visibility-visible'},
    // {
    //   title: 'Create',
    //   icon: 'add',
    //   children: [
    //     {
    //       title: 'Vehicle',
    //       icon: 'truck',
    //       onClick: () => history.push('/app/maintenance/workorder/vehicle/0/new'),
    //     },
    //     {
    //       title: 'Components',
    //       icon: 'stocks',
    //       onClick: () => history.push('/app/maintenance/workorder/component/0/new'),
    //     },
    //     {
    //       title: 'General Asset',
    //       icon: 'asset',
    //       onClick: () => history.push('/app/maintenance/workorder/generalasset/0/new'),
    //     },
    //     {
    //       title: 'BOM',
    //       icon: 'stocks',
    //       onClick: () => history.push('/app/maintenance/workorder/bom/0/new'),
    //     },
    //   ],
    // },
    {title: 'Update', icon: 'edit', onClick: handleUpdate},
    {title: 'Delete', icon: 'trash', onClick: handleDelete},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel', onClick: () => gridExcelExportRef.current?.excelExport()},
  ];

  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initialMenu);

  React.useEffect(() => {
    setRadialMenuItems(initialMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  React.useEffect(() => {
    radialMenu.generate(radialMenuItems);
  }, [radialMenu, radialMenuItems]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-shrink mb-4">
        <WorkOrderViewOption />
      </div>
      <div className="flex flex-grow">
        {isLoading ? (
          <Loader />
        ) : (
          <FsxExcelExport
            fileName={`WorkOrder_(General Asset, Vehicle, Component)_${moment().format(
              'YYYYMMDDHHmm',
            )}`}
            data={workOrderSummaryForGrid?.data}
            ref={excelExportRef}
            columns={workOrder.grid.generalAssetColumns}>
            <FsxTable
              className="h-full"
              dataKey="id"
              data={workOrderSummaryForGrid?.data}
              columns={workOrder.grid.generalAssetColumns}
              onRowClick={e => setSelected(e.dataItem)}
              onRowDoubleClick={e => handleUpdate()}>
              <FsxTableActions onExport={exportToExcel} />
            </FsxTable>
          </FsxExcelExport>
        )}
      </div>
    </div>
  );
};

export default MaintenanceWorkOrder;
