import React, {useRef} from 'react';
import Heading from '@app/views/common/Heading';
import {FsxTable, Loader} from '@app/components/common';
import {WORKORDERCATEGORYTYPE} from '@app/entities/maintenance/workorder/WorkOrderCategoryType';
import {useWorkOrderSummaryForGrid} from '@app/services/maintenance/workorder.service';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

import {useWorkOrderSummary} from '@app/hooks/useWorkOrderSummary';

export interface TabUnderMaintenanceProps {}

const TabUnderMaintenance: React.FC<TabUnderMaintenanceProps> = () => {
  const workOrder = useWorkOrderSummary();

  const {data: workOrderSummaryForGrid, isLoading} = useWorkOrderSummaryForGrid();

  const excelExportRefGA = useRef<any>(null);
  const exportToExcelGA = () => excelExportRefGA.current?.exportAsExcel();

  const excelExportRefV = useRef<any>(null);
  const exportToExcelV = () => excelExportRefV.current?.exportAsExcel();

  const excelExportRefC = useRef<any>(null);
  const exportToExcelC = () => excelExportRefC.current?.exportAsExcel();

  const generalAssetData = React.useMemo(() => {
    return workOrderSummaryForGrid?.data
      .filter(
        d =>
          d.workOrderCategoryTypeId == WORKORDERCATEGORYTYPE.GENERALASSET &&
          d.workOrderStatus == 'Open',
      )
      .map(filteredData => filteredData);
  }, []);

  const vehicleData = React.useMemo(() => {
    return workOrderSummaryForGrid?.data
      .filter(
        d =>
          d.workOrderCategoryTypeId == WORKORDERCATEGORYTYPE.VEHICLE && d.workOrderStatus == 'Open',
      )
      .map(filteredData => filteredData);
  }, []);

  const componentData = React.useMemo(() => {
    return workOrderSummaryForGrid?.data
      .filter(
        d =>
          d.workOrderCategoryTypeId == WORKORDERCATEGORYTYPE.COMPONENT &&
          d.workOrderStatus == 'Open',
      )
      .map(filteredData => filteredData);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full grid grid-cols-1">
          <div className="w-full">
            <div className="flex flex-col h-full">
              <Heading shadow title="General Assets" />
              <FsxExcelExport
                fileName={`UnderMaintenance_GeneralAssets_${moment().format('YYYYMMDDHHmm')}`}
                data={generalAssetData}
                ref={excelExportRefGA}
                columns={workOrder.grid.generalAssetColumns}>
                <FsxTable
                  className="flex-grow"
                  data={generalAssetData}
                  columns={workOrder.grid.generalAssetColumns}>
                  <FsxTableActions onExport={exportToExcelGA} />
                </FsxTable>
              </FsxExcelExport>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col h-full">
              <Heading shadow title="Vehicles" />
              <FsxExcelExport
                fileName={`UnderMaintenance_Vehicles_${moment().format('YYYYMMDDHHmm')}`}
                data={vehicleData}
                ref={excelExportRefV}
                columns={workOrder.grid.vehicleColumns}>
                <FsxTable
                  className="flex-grow"
                  data={vehicleData}
                  columns={workOrder.grid.vehicleColumns}>
                  <FsxTableActions onExport={exportToExcelV} />
                </FsxTable>
              </FsxExcelExport>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col h-full">
              <Heading shadow title="Components" />
              <FsxExcelExport
                fileName={`UnderMaintenance_Components_${moment().format('YYYYMMDDHHmm')}`}
                data={componentData}
                ref={excelExportRefC}
                columns={workOrder.grid.componentColumns}>
                <FsxTable
                  className="flex-grow"
                  data={componentData}
                  columns={workOrder.grid.componentColumns}>
                  <FsxTableActions onExport={exportToExcelC} />
                </FsxTable>
              </FsxExcelExport>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(TabUnderMaintenance);
