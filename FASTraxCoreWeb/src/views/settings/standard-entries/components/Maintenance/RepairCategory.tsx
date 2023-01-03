import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useRepairCategories, KEY} from '@app/services/maintenance/standardentries/repairCategory.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import RepairCategory, {newRepairCategory} from '@app/entities/maintenance/standard-entries/RepairCategory';
import {useStandardEntry} from '../../useStandardEntry';

export interface IRepairCategoryEntryProps {}

const RepairCategoryEntry: React.FC<IRepairCategoryEntryProps> = () => {
  const {data, isLoading} = useRepairCategories();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.repaircategories.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newRepairCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<RepairCategory>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Repair Category" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default RepairCategoryEntry;
