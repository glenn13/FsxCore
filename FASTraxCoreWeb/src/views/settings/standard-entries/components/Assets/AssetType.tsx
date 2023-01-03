import {FsxGrid, Loader} from '@app/components/common';
import {ASSET_TYPES_KEY, useAssetTypes} from '@app/services/asset/standardentries/assetType.service';

import AssetGroupDropdown from '@app/views/asset/common/Dropdowns/AssetGroup';
import {FormikProps} from 'formik';
import {GridColumn} from '@progress/kendo-react-grid';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import React from 'react';
import StandardEntryForm from '../StandardEntryForm';
import _ from 'lodash';
import {newAssetType} from '../../../../../entities/asset/standard-entries/index.schema';
import uri from '@app/helpers/endpoints';
import {useStandardEntry} from '../../useStandardEntry';

export interface IAssetTypeEntryProps {}

const AssetTypeEntry: React.FC<IAssetTypeEntryProps> = () => {
  const {data, isLoading} = useAssetTypes();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.assets.SE.assetType.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newAssetType());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit,
  } = useStandardEntry<AssetType>(fsxGridRef, ASSET_TYPES_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Asset Type"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={initialValue}>
        <AssetGroupDropdown value={_.get(initialValue, 'assetGroup')} isFormik={true} />
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn
            field="assetGroup.title"
            title="Asset Group"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn field="km" title="km" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="kmUnit" title="km unit" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default AssetTypeEntry;
