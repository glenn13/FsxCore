import React, {useRef} from 'react';
import {GridColumn} from '@app/helpers/types';
import FsxTable from '@app/components/common/FsxTable';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface DepreciationGridProps {}

const columns: GridColumn[] = [
  {field: 'depreciationDetail.entryDate', title: 'Entry Date', format: '{0:dd-MMM-yyyy}'},
  {field: 'depreciationDetail.residualCost', title: 'Residual Cost'},
  {field: 'depreciationDetail.usefulLife', title: 'Useful Life (Month)'},
  {field: 'depreciationDetail.depreciationRate', title: 'Dep. Rate'},
  {field: 'depreciationDetail.depreciationAmount', title: 'Dep. Amount'},
];

const excelExportRef = useRef<any>(null);
const exportToExcel = () => excelExportRef.current?.exportAsExcel();

const DepreciationGrid: React.FC<DepreciationGridProps> = () => {
  return (
    <div className="flex flex-1 flex-col p-2 mt-4">
      <FsxExcelExport
        fileName={`Inventory_Depreciation_${moment().format('YYYYMMDDHHmm')}`}
        data={[]}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable data={[]} columns={columns}>
          <FsxTableActions onExport={exportToExcel} />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(DepreciationGrid);
