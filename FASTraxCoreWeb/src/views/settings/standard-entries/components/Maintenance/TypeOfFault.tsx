import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useFaultTypes, KEY} from '@app/services/maintenance/standardentries/typeOfFault.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import TypeOfFault, {newTypeOfFault} from '@app/entities/maintenance/standard-entries/TypeOfFault';
import {useStandardEntry} from '../../useStandardEntry';

export interface IEstimationTypeEntryProps {}

const TypeOfFaultEntry: React.FC<IEstimationTypeEntryProps> = () => {
  const {data, isLoading} = useFaultTypes();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.typeOfFaults.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newTypeOfFault());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<TypeOfFault>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Type of Fault" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="description" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default TypeOfFaultEntry;
