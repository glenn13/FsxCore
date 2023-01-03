import {FsxGrid, Loader} from '@app/components/common';
import {
  TRANSMISSION_TYPE_KEY,
  useTransmissionTypes,
} from '@app/services/asset/standardentries/transmissionTypes.service';
import {
  TransmissionType,
  newTransmissionType,
} from '@app/entities/asset/standard-entries/TransmissionType';

import {FormikProps} from 'formik';
import {GridColumn} from '@progress/kendo-react-grid';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import React from 'react';
import StandardEntryForm from '../StandardEntryForm';
import uri from '@app/helpers/endpoints';
import {useStandardEntry} from '../../useStandardEntry';

export interface ITransmissionTypeEntryProps {}

const TransmissionTypeEntry: React.FC<ITransmissionTypeEntryProps> = () => {
  const {data, isLoading} = useTransmissionTypes();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.assets.SE.assetTransmissionType.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newTransmissionType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit,
  } = useStandardEntry<TransmissionType>(fsxGridRef, TRANSMISSION_TYPE_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Transmission Type"
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

export default TransmissionTypeEntry;