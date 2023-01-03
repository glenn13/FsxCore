import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useServiceTypes, KEY} from '@app/services/maintenance/standardentries/serviceType.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import ServiceType, {newServiceType} from '@app/entities/maintenance/standard-entries/ServiceType';
import {useStandardEntry} from '../../useStandardEntry';

export interface IServiceTypeEntryProps {}

const ServiceTypeEntry: React.FC<IServiceTypeEntryProps> = () => {
  const {data, isLoading} = useServiceTypes();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.serviceTypes.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newServiceType());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<ServiceType>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Service Type" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="description" title="Description" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default ServiceTypeEntry;
