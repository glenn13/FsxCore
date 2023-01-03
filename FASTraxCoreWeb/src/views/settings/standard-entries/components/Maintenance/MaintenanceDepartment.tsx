import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useMaintenanceDepartments, KEY} from '@app/services/maintenance/standardentries/maintenanceDepartment.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import MaintenanceDepartment, {newMaintenanceDepartment} from '@app/entities/maintenance/standard-entries/MaintenanceDepartment';
import {useStandardEntry} from '../../useStandardEntry';

export interface IMaintenanceDepartmentEntryProps {}

const MaintenanceDepartmentEntry: React.FC<IMaintenanceDepartmentEntryProps> = () => {
  const {data, isLoading} = useMaintenanceDepartments();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.maintenancedepartments.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newMaintenanceDepartment());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<MaintenanceDepartment>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Maintenance Department" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default MaintenanceDepartmentEntry;
