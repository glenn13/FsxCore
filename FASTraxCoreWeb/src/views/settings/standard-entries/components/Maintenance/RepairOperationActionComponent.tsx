import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import { useAssetCategories } from '@app/services/asset/standardentries/assetCategory.service';
import {useRepairOperationActionComponents, KEY} from '@app/services/maintenance/standardentries/repairOperationActionComponent.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import RepairOperationActionComponent, {newRepairOperationActionComponent} from '@app/entities/maintenance/standard-entries/RepairOperationActionComponent';
import {useStandardEntry} from '../../useStandardEntry';
import RepairOperationPicker from '@app/views/maintenance/common/Dropdowns/RepairOperationPicker';
import RepairActionDropdown from '@app/views/maintenance/common/Dropdowns/RepairAction';
import FsxFormikNumericTextBox from '@app/components/common/FsxFormik/FsxFormikNumericTextBox';

export interface IRepairOperationActionComponentEntryProps {}

const RepairOperationActionComponentEntry: React.FC<IRepairOperationActionComponentEntryProps> = () => {
  const {data, isLoading} = useRepairOperationActionComponents();
  const {data: assetCategory, isLoading: assetCategoryIsLoading} = useAssetCategories();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.repairOperationActions.components.all;
  const assetCategoryId = React.useMemo(() => (!assetCategoryIsLoading && assetCategory ? assetCategory.data.filter(item => item.title.toUpperCase() === 'COMPONENT')[0].id : undefined), [
    assetCategoryIsLoading,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);

  const handleAdd = React.useCallback(() => {
    setInitialValue(newRepairOperationActionComponent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<RepairOperationActionComponent>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Repair Operation Action - Component" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue}>
        <RepairOperationPicker name="repairOperationId" label="Repair Operation" assetCategoryId={assetCategoryId} />
        <RepairActionDropdown filterable isFormik className="mt-2" />
        <FsxFormikNumericTextBox label="Sales Price" name="salesPrice" className="mt-2" />
        <FsxFormikNumericTextBox label="Hours" name="hours" className="mt-2" />
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="repairOperation.description" title="Repair Operation" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="repairAction.description" title="Repair Action" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="salesPrice" title="Sales Price" filter={'numeric'} columnMenu={KGridMenuFilter} />
          <GridColumn field="hours" title="Hours" filter={'numeric'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default RepairOperationActionComponentEntry;
