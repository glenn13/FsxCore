import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import { useAssetColors, ASSET_COLORS_KEY } from '@app/services/asset/standardentries/assetColor.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import {useStandardEntry} from '../../useStandardEntry';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import { newAssetColor } from '@app/entities/asset/standard-entries/index.schema';

export interface IAssetColorEntryProps {}

const AssetColorEntry: React.FC<IAssetColorEntryProps> = () => {
const { data, isLoading } = useAssetColors();
const fsxGridRef = React.useRef<any>(null);
const formikRef = React.useRef<FormikProps<any>>(null);
const URI = uri.assets.SE.assetColor.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newAssetColor());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<AssetColor>(fsxGridRef, ASSET_COLORS_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Asset Color" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default AssetColorEntry;
