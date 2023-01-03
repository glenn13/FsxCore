import {FsxGrid, Loader} from '@app/components/common';
import {ASSET_MODELS_KEY, useAssetModels} from '@app/services/asset/standardentries/assetModel.service';

import {FormikProps} from 'formik';
import {GridColumn} from '@progress/kendo-react-grid';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import React from 'react';
import StandardEntryForm from '../StandardEntryForm';
import {newAssetModel} from '../../../../../entities/asset/standard-entries/index.schema';
import uri from '@app/helpers/endpoints';
import {useStandardEntry} from '../../useStandardEntry';

export interface IAssetModelEntryProps {}

const AssetModelEntry: React.FC<IAssetModelEntryProps> = () => {
  const {data, isLoading} = useAssetModels();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.assets.SE.assetModel.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newAssetModel());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit,
  } = useStandardEntry<AssetModel>(fsxGridRef, ASSET_MODELS_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Asset Model"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={initialValue}>
        {/** <ManufacturerDropdown isFormik={true} /> **/}
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn
            field="manufacturer.title"
            title="Manufacturer"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
        </FsxGrid>
      )}
    </>
  );
};

export default AssetModelEntry;
