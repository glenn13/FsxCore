import {FsxGrid, Loader} from '@app/components/common';
import {MeterType, newMeterType} from '@app/entities/asset/standard-entries/MeterType';

import {FormikProps} from 'formik';
import {GridColumn} from '@progress/kendo-react-grid';
import { useMeterTypes, METER_TYPES_KEY } from '@app/services/asset/standardentries/meterTypes.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import React from 'react';
import StandardEntryForm from '../StandardEntryForm';
import uri from '@app/helpers/endpoints';
import {useStandardEntry} from '../../useStandardEntry';

export interface IAssetMeterTypeEntryProps {}

const AssetMeterTypeEntry: React.FC<IAssetMeterTypeEntryProps> = () => {
  const {data, isLoading} = useMeterTypes();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.assets.SE.assetMeterType.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newMeterType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<MeterType>(fsxGridRef, METER_TYPES_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Asset Meter Type"
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

export default AssetMeterTypeEntry;
