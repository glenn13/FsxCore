import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import { useAssetCategories, ASSET_CATEGORIES_KEY } from '@app/services/asset/standardentries/assetCategory.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import uri from '@app/helpers/endpoints';
import {useStandardEntry} from '../../useStandardEntry';
import { newAssetCategory } from '@app/entities/asset/standard-entries/index.schema';

export interface IAssetCategoryEntryProps {}

const AssetCategoryEntry: React.FC<IAssetCategoryEntryProps> = () => {
  const {data, isLoading} = useAssetCategories();
  const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.assets.SE.assetCategory.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newAssetCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<AssetCategory>(fsxGridRef, ASSET_CATEGORIES_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Asset Category" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
      {isLoading && <Loader />}
      {!isLoading && data && data.data && (
        <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
          <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default AssetCategoryEntry;
