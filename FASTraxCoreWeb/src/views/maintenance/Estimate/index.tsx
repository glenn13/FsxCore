import {FsxGrid, Loader} from '@app/components/common';
import React, {useRef} from 'react';
import {
  deleteEstimateComponent,
  deleteEstimateGeneralAsset,
  deleteEstimateVehicle,
  useEstimateSummaryForGrid,
} from '@app/services/maintenance/estimate.service';

import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import EstimateSummary from '@app/entities/maintenance/estimate/EstimateSummary';
import EstimateViewOption from './ViewOptions';
import {FsxGridExcelExportRef} from '@app/components/common/FsxGrid';
import {GridColumn} from '@progress/kendo-react-grid';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import {RadialItem} from '@app/store/app/types';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';

export interface MaintenanceEstimateProps {}

const MaintenanceEstimate: React.FC<MaintenanceEstimateProps> = () => {
  const history = useHistory();

  const {data: estimateSummaryForGrid, isLoading, fetchMore} = useEstimateSummaryForGrid();
  const [selected, setSelected] = React.useState<EstimateSummary>();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});

  const gridExcelExportRef = useRef<FsxGridExcelExportRef>();

  const handleUpdate = React.useCallback(() => {
    switch (selected?.assetCategoryId) {
      case AssetCategoryEnum.Component:
        history.push(`/app/maintenance/estimate/${selected.id}/component`);
        break;
      case AssetCategoryEnum.GeneralAsset:
        history.push(`/app/maintenance/estimate/${selected.id}/generalasset`);
        break;
      case AssetCategoryEnum.Vehicle:
        history.push(`/app/maintenance/estimate/${selected.id}/vehicle`);
        break;
    }
  }, [history, selected]);

  const handleDelete = () => {
    switch (selected?.assetCategoryId) {
      case AssetCategoryEnum.Component:
        deleteEstimateComponent(selected.id).then(() => fetchMore());
        break;
      case AssetCategoryEnum.GeneralAsset:
        deleteEstimateGeneralAsset(selected.id).then(() => fetchMore());
        break;
      case AssetCategoryEnum.Vehicle:
        deleteEstimateVehicle(selected.id).then(() => fetchMore());
        break;
    }
  };

  const initialMenu: RadialItem[] = [
    {title: 'View', icon: 'visibility-visible'},
    {
      title: 'Create',
      icon: 'add',
      children: [
        {
          title: 'Vehicle',
          icon: 'truck',
          onClick: () => history.push('/app/maintenance/estimate/vehicle/0/new'),
        },
        {
          title: 'Components',
          icon: 'stocks',
          onClick: () => history.push('/app/maintenance/estimate/component/0/new'),
        },
        {
          title: 'General Asset',
          icon: 'asset',
          onClick: () => history.push('/app/maintenance/estimate/generalasset/0/new'),
        },
      ],
    },
    {title: 'Update', icon: 'edit', onClick: handleUpdate},
    {title: 'Delete', icon: 'trash', onClick: handleDelete},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel', onClick: () => gridExcelExportRef.current?.excelExport()},
  ];

  React.useEffect(() => {
    radialMenu.generate(initialMenu);
  }, [radialMenu, initialMenu]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-shrink mb-4">
        <EstimateViewOption />
      </div>
      <div className="flex flex-grow">
        {isLoading ? (
          <Loader />
        ) : (
          <FsxGrid
            data={estimateSummaryForGrid?.data}
            onRowClick={(e: any) => {
              setSelected(e.dataItem);
            }}
            onRowDoubleClick={(e: any) => {
              handleUpdate();
            }}
            gridExcelExportRef={{ref: gridExcelExportRef, fileName: 'Work Estimate Summary'}}>
            <GridColumn
              field="estimationNumber"
              title="Estimation No."
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="estimationStatus"
              title="Status"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="assetRefId"
              title="Asset ID"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="vinSerialNo"
              title="VIN / Serial No."
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="estimationType"
              title="Estimation Type"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="dateRaised"
              title="Date Raised"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
            <GridColumn
              field="maintenanceLocation"
              title="Location"
              filter={'text'}
              columnMenu={KGridMenuFilter}
            />
          </FsxGrid>
        )}
      </div>
    </div>
  );
};

export default React.memo(MaintenanceEstimate);
