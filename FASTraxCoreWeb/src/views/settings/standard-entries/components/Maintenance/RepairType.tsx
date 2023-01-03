import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useRepairTypes, KEY} from '@app/services/maintenance/standardentries/repairType.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import RepairType, {newRepairType} from '@app/entities/maintenance/standard-entries/RepairType';
import {useStandardEntry} from '../../useStandardEntry';

export interface IRepairStatusEntryProps {}

const RepairStatusEntry: React.FC<IRepairStatusEntryProps> = () => {
  const {data, isLoading} = useRepairTypes();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.repairTypes.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newRepairType());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<RepairType>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Repair Type" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="description" title="Description" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default RepairStatusEntry;
