import {AssetUOM, newAssetUOM} from '@app/entities/asset/standard-entries/AssetUOM';
import {FsxGrid, Loader} from '@app/components/common';
import {ASSET_UOM_KEY, useAssetUOM} from '@app/services/asset/standardentries/assetUOM.service';

import {FormikProps} from 'formik';
import {GridColumn} from '@progress/kendo-react-grid';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import React from 'react';
import StandardEntryForm from '../StandardEntryForm';
import uri from '@app/helpers/endpoints';
import {useStandardEntry} from '../../useStandardEntry';

export interface IAssetUOMViewProps {}

const AssetUOMView: React.FC<IAssetUOMViewProps> = () => {
  const {data, isLoading} = useAssetUOM();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.assets.SE.assetUOM.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newAssetUOM());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit,
  } = useStandardEntry<AssetUOM>(fsxGridRef, ASSET_UOM_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Asset Unit"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={initialValue}
      />
      {isLoading && <Loader />}
      {!isLoading && data && data.data && (
        <FsxGrid data={data.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default AssetUOMView;
