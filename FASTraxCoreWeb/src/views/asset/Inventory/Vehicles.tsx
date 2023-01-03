import React, {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useAsset} from '../../../hooks/useAsset';
import {FsxTable} from '../../../components/common';
import {deleteVehicle, useVehiclesGrid} from '@app/services/asset/vehicles.service';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface VehiclesTabProps {}

const VehiclesTab: React.FC<VehiclesTabProps> = () => {
  const history = useHistory();
  const vehicles = useVehiclesGrid();
  const [selected, setSelected] = React.useState(0);
  const asset = useAsset({rerenderDelayMS: 100, hasSelected: !!selected});

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleNew = React.useCallback(() => history.push('/app/asset/inventory/vehicles/new'), [
    history,
  ]);

  const handleUpdate = React.useCallback(
    () => selected && history.push(`/app/asset/inventory/vehicles/${selected}`),
    [selected, history],
  );

  const handleDelete = React.useCallback(() => selected && deleteVehicle(selected), [selected]);

  const handleDisposition = React.useCallback(() => {
    selected && history.push(`/app/asset/inventory/vehicles/${selected}/disposition`);
  }, [selected, history]);

  React.useEffect(() => {
    asset.generateRadialMenu.grid({handleNew, handleUpdate, handleDelete, handleDisposition});
  }, [asset.generateRadialMenu, handleNew, handleUpdate, handleDelete, handleDisposition]);

  return (
    <div className="flex flex-1 flex-col">
      <FsxExcelExport
        fileName={`Inventory_Vehicles_${moment().format('YYYYMMDDHHmm')}`}
        data={vehicles.data?.data}
        ref={excelExportRef}
        columns={asset.grid.common.columns}>
        <FsxTable
          className="h-full"
          dataKey="id"
          data={vehicles.data?.data}
          columns={asset.grid.common.columns}
          onRowClick={e => setSelected(e.dataItem['id'])}
          onRowDoubleClick={e => history.push(`/app/asset/inventory/vehicles/${e.dataItem['id']}`)}
        />
        <FsxTableActions onExport={exportToExcel} />
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(VehiclesTab);
