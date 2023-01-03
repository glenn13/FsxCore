import {FsxGrid, Loader} from '@app/components/common';
import {
  ASSET_OWNERSHIP_TYPES_KEY,
  useAssetOwnershipTypes,
} from '@app/services/asset/standardentries/assetOwnershipType.service';

import {FormikProps} from 'formik';
import {GridColumn} from '@progress/kendo-react-grid';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import React from 'react';
import StandardEntryForm from '../StandardEntryForm';
import {newAssetOwnershipType} from '../../../../../entities/asset/standard-entries/index.schema';
import uri from '@app/helpers/endpoints';
import {useStandardEntry} from '../../useStandardEntry';

export interface IAssetOwnershipTypeEntryProps {}

const AssetOwnershipTypeEntry: React.FC<IAssetOwnershipTypeEntryProps> = () => {
  const {data, isLoading} = useAssetOwnershipTypes();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.assets.SE.assetOwnershipType.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newAssetOwnershipType());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit,
  } = useStandardEntry<AssetOwnershipType>(fsxGridRef, ASSET_OWNERSHIP_TYPES_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Asset Ownership"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={initialValue}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default AssetOwnershipTypeEntry;