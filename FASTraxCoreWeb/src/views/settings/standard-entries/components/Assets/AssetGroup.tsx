import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import { useAssetGroups, ASSET_GROUPS_KEY} from '@app/services/asset/standardentries/assetGroup.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import {useStandardEntry} from '../../useStandardEntry';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import AssetCategoryDropdown from '@app/views/asset/common/Dropdowns/AssetCategory';
import { newAssetGroup } from '@app/entities/asset/standard-entries/index.schema';

export interface IAssetGroupEntryProps {}

const AssetGroupEntry: React.FC<IAssetGroupEntryProps> = () => {
  const {data, isLoading} = useAssetGroups();
  const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.assets.SE.assetGroup.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newAssetGroup());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<AssetGroup>(fsxGridRef, ASSET_GROUPS_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Asset Group" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue}>
        <AssetCategoryDropdown isFormik={true} />
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="assetCategory.title" title="Asset Category" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default AssetGroupEntry;
