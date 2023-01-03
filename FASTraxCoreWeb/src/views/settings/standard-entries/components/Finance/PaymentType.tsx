import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {usePaymentTypes, KEY} from '@app/services/finance/standardentries/paymentType.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import PaymentType, {newPaymentType} from '@app/entities/finance/standard-entries/PaymentType';
import {useStandardEntry} from '../../useStandardEntry';

export interface IPaymentTypeEntryProps {}

const PaymentTypeEntry: React.FC<IPaymentTypeEntryProps> = () => {
  const {data, isLoading} = usePaymentTypes();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.finance.SE.paymentTypes.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newPaymentType());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<PaymentType>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Cost Center" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default PaymentTypeEntry;
