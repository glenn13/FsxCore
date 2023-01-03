import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useFailureCauses, KEY} from '@app/services/maintenance/standardentries/failureCause.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import {Checkbox} from '@progress/kendo-react-inputs';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import FailureCause, {newFailureCause} from '@app/entities/maintenance/standard-entries/FailureCause';
import {useStandardEntry} from '../../useStandardEntry';
import {FsxFormikCheckbox} from '@app/components/common/FsxFormik';
import AssetCategoryDropdown from '@app/views/asset/common/Dropdowns/AssetCategory';

export interface IFailureCauseEntryProps {}

const FailureCauseEntry: React.FC<IFailureCauseEntryProps> = () => {
  const {data, isLoading} = useFailureCauses();
  const fsxGridRef = React.useRef<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const URI = uri.maintenance.SE.failureCauses.all;

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleAdd = React.useCallback(() => {
    setInitialValue(newFailureCause());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<FailureCause>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  const cellItemCheckboxTemplate = (props: any) => {
    return (
      <td>
        <Checkbox value={props.dataItem.isForECOD} disabled={true} />
      </td>
    );
  };

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Failure Cause" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue}>
        <AssetCategoryDropdown isFormik={true} />
        <FsxFormikCheckbox name="isForECOD" label="For ECOD" className="mt-3" />
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="description" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="assetCategory.title" title="Asset Category" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="isForEcod" title="For ECOD" filter={'text'} columnMenu={KGridMenuFilter} cell={cellItemCheckboxTemplate} />
        </FsxGrid>
      )}
    </>
  );
};

export default FailureCauseEntry;
