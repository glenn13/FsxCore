import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useRepairGroups, KEY} from '@app/services/maintenance/standardentries/repairGroup.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import RepairGroup, {newRepairGroup} from '@app/entities/maintenance/standard-entries/RepairGroup';
import {useStandardEntry} from '../../useStandardEntry';
import AssetCategoryDropdown from '@app/views/asset/common/Dropdowns/AssetCategory';
import {FsxFormikInput} from '@app/components/common/FsxFormik';

export interface IRepairGroupEntryProps {}

const RepairGroupEntry: React.FC<IRepairGroupEntryProps> = () => {
  const {data, isLoading} = useRepairGroups();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.repairGroups.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newRepairGroup());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit,
  } = useStandardEntry<RepairGroup>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Repair Group"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={initialValue}>
        <FsxFormikInput label="SRO" name="sro" required className="mb-2" />
        <AssetCategoryDropdown isFormik={true} />
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
          <GridColumn field="sro" title="SRO" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default RepairGroupEntry;
