import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useRepairSubGroups, KEY} from '@app/services/maintenance/standardentries/repairSubGroup.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import RepairSubGroup, {newRepairSubGroup} from '@app/entities/maintenance/standard-entries/RepairSubGroup';
import {useStandardEntry} from '../../useStandardEntry';
import RepairGroupDropdown from '@app/views/maintenance/common/Dropdowns/RepairGroup';
import RepairLevelDropdown from '@app/views/maintenance/common/Dropdowns/RepairLevel';

export interface IRepairSubGroupEntryProps {}

const RepairSubGroupEntry: React.FC<IRepairSubGroupEntryProps> = () => {
  const {data, isLoading} = useRepairSubGroups();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.repairSubGroups.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newRepairSubGroup());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<RepairSubGroup>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Repair Sub-Group" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue}>
        <RepairGroupDropdown isFormik={true} className="mb-2" />
        <RepairLevelDropdown isFormik={true} className="mb-2" />
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="description" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="repairGroup.description" title="Repair Group" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="repairLevel.description" title="Repair Level" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="sro" title="SRO" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default RepairSubGroupEntry;
