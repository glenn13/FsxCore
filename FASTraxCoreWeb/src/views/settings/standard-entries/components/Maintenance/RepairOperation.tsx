import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {
  useRepairOperations,
  KEY,
} from '@app/services/maintenance/standardentries/repairOperation.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import RepairOperation, {
  newRepairOperation,
} from '@app/entities/maintenance/standard-entries/RepairOperation';
import {useStandardEntry} from '../../useStandardEntry';
import RepairGroupDropdown from '@app/views/maintenance/common/Dropdowns/RepairGroup';
import RepairSubGroupDropdown from '@app/views/maintenance/common/Dropdowns/RepairSubGroup';
import ServiceTypeDropdown from '@app/views/maintenance/common/Dropdowns/ServiceType';
import AssetCategoryDropdown from '@app/views/asset/common/Dropdowns/AssetCategory';
import {FsxFormikInput} from '@app/components/common/FsxFormik';

export interface IRepairOperationEntryProps {}

const RepairOperationEntry: React.FC<IRepairOperationEntryProps> = () => {
  const {data, isLoading} = useRepairOperations();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.repairOperations.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newRepairOperation());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit,
  } = useStandardEntry<RepairOperation>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Repair Operation"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={initialValue}>
        <AssetCategoryDropdown isFormik />
        <RepairGroupDropdown isFormik={true} className="mb-2" />
        <RepairSubGroupDropdown isFormik={true} className="mb-2" />
        <ServiceTypeDropdown isFormik={true} className="mb-2" />
        <FsxFormikInput label="SRO" name="sro" required className="mb-2" />
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn
            field="description"
            title="Title"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="assetCategory.title"
            title="Asset Category"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="repairGroup.description"
            title="Repair Group"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="repairSubGroup.description"
            title="Repair Sub-Group"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="serviceType.description"
            title="Repair Sub-Group"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn field="sro" title="SRO" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default RepairOperationEntry;
