import {FsxGrid, Loader} from '@app/components/common';
import {
  ASSET_MANUFACTURERS_KEY,
  useAssetManufacturers,
} from '@app/services/asset/standardentries/assetManufacturer.service';
import {FormikProps} from 'formik';
import {GridColumn} from '@progress/kendo-react-grid';
import {newAssetManufacturer} from '../../../../../entities/asset/standard-entries/index.schema';
import {useStandardEntry} from '../../useStandardEntry';
import uri from '@app/helpers/endpoints';
import _, { initial } from 'lodash';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import React from 'react';
import StandardEntryForm from '../StandardEntryForm';
import AssetTypeDropdown from '@app/views/asset/common/Dropdowns/AssetType';

export interface IAssetManufacturerEntryProps {}

const AssetManufacturerEntry: React.FC<IAssetManufacturerEntryProps> = () => {
  const {data, isLoading} = useAssetManufacturers();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.assets.SE.assetManufacturer.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newAssetManufacturer());
  }, []);

  const [selected, setSelected] = React.useState<AssetManufacturer>();
  const handleEdit = React.useCallback(() => {
    if (!selected) return;
    setInitialValue(selected);
    setIsOpen(true);
  }, [selected]);

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit
  } = useStandardEntry<AssetManufacturer>(fsxGridRef, ASSET_MANUFACTURERS_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Asset Manufacturer"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={initialValue}>
        <AssetTypeDropdown isFormik={true} />
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid 
          data={data?.data} 
          className="h-full" 
          gridRef={fsxGridRef} 
          onRowClick={e => setSelected(e.dataItem)}
          onRowDoubleClick={handleEdit}>
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn
            field="assetType.title"
            title="Asset Type"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
        </FsxGrid>
      )}
    </>
  );
};

export default AssetManufacturerEntry;
