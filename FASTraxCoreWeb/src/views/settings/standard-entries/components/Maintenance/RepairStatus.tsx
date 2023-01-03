import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useRepairStatuses, KEY} from '@app/services/maintenance/standardentries/repairStatus.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import RepairStatus, {newRepairStatus} from '@app/entities/maintenance/standard-entries/RepairStatus';
import {useStandardEntry} from '../../useStandardEntry';

export interface IRepairStatusEntryProps {}

const RepairStatusEntry: React.FC<IRepairStatusEntryProps> = () => {
  const {data, isLoading} = useRepairStatuses();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.repairstatuses.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newRepairStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<RepairStatus>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Repair Status" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default RepairStatusEntry;
