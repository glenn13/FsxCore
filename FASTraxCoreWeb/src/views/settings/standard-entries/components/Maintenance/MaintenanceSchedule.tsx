import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useMaintenanceSchedules, KEY} from '@app/services/maintenance/standardentries/maintenanceSchedule.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import MaintenanceSchedule, {newMaintenanceSchedule} from '@app/entities/maintenance/standard-entries/MaintenanceSchedule';
import {useStandardEntry} from '../../useStandardEntry';

export interface IMaintenanceScheduleEntryProps {}

const MaintenanceScheduleEntry: React.FC<IMaintenanceScheduleEntryProps> = () => {
  const {data, isLoading} = useMaintenanceSchedules();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.maintenanceschedules.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newMaintenanceSchedule());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<MaintenanceSchedule>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Maintenance Schedule" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default MaintenanceScheduleEntry;
