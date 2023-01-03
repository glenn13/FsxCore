import React, {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {GridColumn, NumberKeyValuePair} from '@app/helpers/types';
import Heading from '@app/views/common/Heading';
import {useAsset} from '../../../hooks/useAsset';
import {FsxTable} from '../../../components/common';
import GeneralAssetGroup from '@app/entities/asset/inventory/GeneralAssetGroup';
import {
  deleteGeneralAsset,
  getGeneralAssetGroups,
  getGeneralAssetsByGroup,
} from '@app/services/asset/assets.service';
import {GeneralAsset} from '@app/entities/asset/inventory/GeneralAsset';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface GeneralAssetsProps {}

const columns: GridColumn[] = [
  {field: 'title', title: 'Group No'},
  {field: 'generalAssetName.title', title: 'General Asset Name'},
  {field: 'availableQty', title: 'Available Qty'},
  {field: 'issuedQty', title: 'Issued Qty'},
  {field: 'damagedQty', title: 'Damaged Qty'},
  {field: 'totalQty', title: 'Total Qty'},
];

const GeneralAssetsTab: React.FC<GeneralAssetsProps> = () => {
  const history = useHistory();
  const [selected, setSelected] = React.useState(0);
  const asset = useAsset({rerenderDelayMS: 100, hasSelected: !!selected});
  const [selectedGroup, setSelectedGroup] = React.useState(0);
  const [data, setData] = React.useState<GeneralAssetGroup[]>([]);
  const [generalAssetsGroupMap, setGeneralAssetsGroupMap] = React.useState<
    NumberKeyValuePair<GeneralAsset[]>
  >({});

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const excelExportRefS = useRef<any>(null);
  const exportToExcelS = () => excelExportRefS.current?.exportAsExcel();

  const handleNew = React.useCallback(() => history.push('/app/asset/inventory/generals/new'), [
    history,
  ]);

  const handleUpdate = React.useCallback(() => {
    selected && history.push(`/app/asset/inventory/generals/${selected}`);
  }, [selected, history]);

  const handleDelete = React.useCallback(() => selected && deleteGeneralAsset(selected), [
    selected,
  ]);

  const handleDisposition = React.useCallback(() => {
    selected && history.push(`/app/asset/inventory/generals/${selected}/disposition`);
  }, [selected, history]);

  React.useEffect(() => {
    asset.generateRadialMenu.grid({handleNew, handleUpdate, handleDelete, handleDisposition});
  }, [asset.generateRadialMenu, handleNew, handleUpdate, handleDelete, handleDisposition]);

  React.useEffect(() => {
    getGeneralAssetGroups().then(response => setData(response.data));
  }, []);

  React.useEffect(() => {
    if (!selectedGroup) return;

    if (generalAssetsGroupMap[selectedGroup]) return;

    getGeneralAssetsByGroup(selectedGroup).then(response =>
      setGeneralAssetsGroupMap(state => ({...state, [selectedGroup]: response.data})),
    );
  }, [selectedGroup, generalAssetsGroupMap]);

  return (
    <div className="pt-2 grid grid-cols-1">
      <div className="flex">
        <FsxExcelExport
          fileName={`Invetory_GeneralAsset_${moment().format('YYYYMMDDHHmm')}`}
          data={data}
          ref={excelExportRef}
          columns={columns}>
          <FsxTable
            className="flex-grow"
            testId="generalAssetGroups"
            columns={columns}
            data={data}
            onRowClick={e => setSelectedGroup(e.dataItem['id'])}>
            <FsxTableActions onExport={exportToExcel} />
          </FsxTable>
        </FsxExcelExport>
      </div>
      <div className="flex flex-col">
        <Heading title="Secondary Details" />
        <FsxExcelExport
          fileName={`Invetory_GeneralAsset_SecondaryDetails_${moment().format('YYYYMMDDHHmm')}`}
          data={generalAssetsGroupMap[selectedGroup]}
          ref={excelExportRefS}
          columns={asset.grid.common.columns}>
          <FsxTable
            className="flex-grow"
            styles={{height: '300px'}}
            columns={asset.grid.common.columns}
            data={generalAssetsGroupMap[selectedGroup]}
            onRowClick={e => setSelected(e.dataItem['id'])}
            onRowDoubleClick={e =>
              history.push(`/app/asset/inventory/generals/${e.dataItem['id']}`)
            }>
            <FsxTableActions onExport={exportToExcelS}/>
          </FsxTable>
        </FsxExcelExport>
      </div>
    </div>
  );
};

export default React.memo(GeneralAssetsTab);
