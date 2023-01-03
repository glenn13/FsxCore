import React, {useRef} from 'react';
import {FsxTable} from '@app/components/common';
import {FsxDrawer} from '@app/components/common';
import {getLabelByCategory} from '@app/helpers/inventory';
import {Asset} from '@app/entities/asset/inventory/Asset';
import {generateNegativeNumber} from '@app/helpers/randoms';
import assetsService from '@app/services/asset/assets.service';
import {GridColumn, NumberKeyValuePair} from '@app/helpers/types';
import vehiclesService from '@app/services/asset/vehicles.service';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import EntityLinkedAsset from '@app/entities/asset/inventory/EntityLinkedAsset';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';
export interface BaseLinkedAssetsProps {
  referenceId: number;
  categoryId: AssetCategoryEnum;
}

export interface LinkedAssetsProps extends BaseLinkedAssetsProps {
  onDelete?: (linkedAsset: EntityLinkedAsset<Asset>) => boolean;
  onSubmit?: (linkedAsset: EntityLinkedAsset<Asset>) => boolean;
  linkedAssets: EntityLinkedAsset<Asset>[];
  linkedCategoryId?: AssetCategoryEnum;
}

const getColumns = (category: AssetCategoryEnum) =>
  [
    {field: 'serialNo', title: getLabelByCategory(category)},
    {field: 'assetRefId', title: 'Reference No'},
  ] as GridColumn[];

const getLinkedColumns = (category: AssetCategoryEnum) =>
  [
    {field: 'linkedReference.serialNo', title: getLabelByCategory(category)},
    {field: 'linkedReference.assetRefId', title: 'Reference No'},
  ] as GridColumn[];

const LinkedAssets: React.FC<LinkedAssetsProps> = ({
  linkedAssets,
  referenceId,
  linkedCategoryId,
  categoryId,
  onDelete,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [toLink, setToLink] = React.useState<Asset>();
  const [availableAssets, setAvailableAssets] = React.useState<Asset[]>([]);
  const [toDelete, setToDelete] = React.useState<EntityLinkedAsset<Asset>>();

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleSubmit = () => {
    if (!toLink) return;

    const linkedAsset: EntityLinkedAsset<Asset> = {
      id: generateNegativeNumber({obj: {pool: linkedAssets, key: 'id'}}),
      referenceId,
      linkedReferenceId: toLink.id,
      linkedReference: toLink,
    };

    if (onSubmit && !onSubmit(linkedAsset)) return;

    setToLink(undefined);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (categoryId === AssetCategoryEnum.GeneralAsset)
      assetsService.getAssetsForGrid().then(response => setAvailableAssets(response.data));
    if (categoryId === AssetCategoryEnum.Vehicle)
      vehiclesService.getVehiclesForGrid().then(response => setAvailableAssets(response.data));
  }, [categoryId]);

  const ids = React.useMemo(
    () =>
      linkedAssets.reduce((final, current) => {
        final[current.linkedReferenceId] = true;

        return final;
      }, {} as NumberKeyValuePair<boolean>),
    [linkedAssets],
  );
  const memAvailableAssets = React.useMemo(() => availableAssets.filter(aa => !ids[aa.id]), [
    ids,
    availableAssets,
  ]);

  return (
    <div className="flex flex-1 flex-col p-2">
      <FsxDrawer
        title="Linked Asset"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <FsxTable
            data={memAvailableAssets}
            columns={getColumns(linkedCategoryId || categoryId)}
            onRowClick={e => setToLink(e.dataItem)}
            onRowDoubleClick={handleSubmit}
          />
        </div>
      </FsxDrawer>
      <FsxExcelExport
        fileName={`Inventory_LinkedAssets_${moment().format('YYYYMMDDHHmm')}`}
        data={linkedAssets}
        ref={excelExportRef}
        columns={getLinkedColumns(categoryId)}>
        <FsxTable
          data={linkedAssets}
          columns={getLinkedColumns(categoryId)}
          onRowClick={e => setToDelete(e.dataItem)}>
          <FsxTableActions
            onAdd={() => setIsOpen(true)}
            onDelete={() => toDelete && onDelete && onDelete(toDelete)}
            onExport={exportToExcel}
          />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(LinkedAssets);
