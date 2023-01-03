import React, {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useAsset} from '../../../hooks/useAsset';
import {FsxTable} from '../../../components/common';
import {deleteComponent, useComponentsGrid} from '@app/services/asset/inventory/components.service';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface ComponentsTabProps {}

const ComponentsTab: React.FC<ComponentsTabProps> = () => {
  const history = useHistory();
  const components = useComponentsGrid();
  const [selected, setSelected] = React.useState(0);
  const asset = useAsset({rerenderDelayMS: 100, hasSelected: !!selected});

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleNew = React.useCallback(() => history.push('/app/asset/inventory/components/new'), [
    history,
  ]);

  const handleUpdate = React.useCallback(() => {
    selected && history.push(`/app/asset/inventory/components/${selected}`);
  }, [selected, history]);

  const handleDelete = React.useCallback(() => selected && deleteComponent(selected), [selected]);

  const handleDisposition = React.useCallback(() => {
    selected && history.push(`/app/asset/inventory/components/${selected}/disposition`);
  }, [selected, history]);

  React.useEffect(() => {
    asset.generateRadialMenu.grid({handleNew, handleUpdate, handleDelete, handleDisposition});
  }, [asset.generateRadialMenu, handleNew, handleUpdate, handleDelete, handleDisposition]);

  return (
    <div className="flex flex-1">
      <FsxExcelExport
        fileName={`Inventory_Components_${moment().format('YYYYMMDDHHmm')}`}
        data={components.data?.data}
        ref={excelExportRef}
        columns={asset.grid.common.columns}>
        <FsxTable
          className="h-full"
          dataKey="id"
          data={components.data?.data}
          columns={asset.grid.common.columns}
          onRowClick={e => setSelected(e.dataItem['id'])}
          onRowDoubleClick={e =>
            history.push(`/app/asset/inventory/components/${e.dataItem['id']}`)
          }>
          <FsxTableActions onExport={exportToExcel} />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(ComponentsTab);
