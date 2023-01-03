import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {useCustomFields, KEY} from '@app/services/asset/standardentries/customField.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import uri from '@app/helpers/endpoints';
import {useStandardEntry} from '../../useStandardEntry';
import {CustomField, newCustomField, customFieldShape} from '@app/entities/global/CustomField';
import {FsxFormikInput} from '@app/components/common/FsxFormik';
import FormPagesDropdown from '@app/views/catalog/common/Dropdowns/FormPages';
import CustomFieldTypeDropdown from '@app/views/asset/common/Dropdowns/CustomFieldType';
import {Checkbox} from '@progress/kendo-react-inputs';
import {FsxFormikCheckbox} from '@app/components/common/FsxFormik';
import * as yup from 'yup';

export interface ICustomFieldEntryProps {}

const CustomFieldEntry: React.FC<ICustomFieldEntryProps> = () => {
  const {data, isLoading} = useCustomFields();
  const formikRef = React.useRef<FormikProps<any>>(null);
  const fsxGridRef = React.useRef<any>(null);
  const URI = uri.assets.SE.customField.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newCustomField());
  }, []);

  console.log(data);

  const handleEdit = React.useCallback(() => {}, []);

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit,
  } = useStandardEntry<CustomField>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  const cellItemIsRequired = (props: any) => {
    return (
      <td>
        <Checkbox value={props.dataItem.isRequired} disabled={true} />
      </td>
    );
  };

  const cellItemIsVisible = (props: any) => {
    return (
      <td>
        <Checkbox value={props.dataItem.isVisible} disabled={true} />
      </td>
    );
  };

  const cellItemIsActive = (props: any) => {
    return (
      <td>
        <Checkbox value={props.dataItem.isActive} disabled={true} />
      </td>
    );
  };

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Custom Field"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={initialValue}
        validationSchema={yup.object().shape(customFieldShape)}>
        <FormPagesDropdown isFormik></FormPagesDropdown>
        <FsxFormikInput label="Name" name="name" required className="mt-3" />
        <CustomFieldTypeDropdown isFormik className="mt-3"></CustomFieldTypeDropdown>
        <FsxFormikCheckbox name="isRequired" label="Is Required" className="mt-3" />
        <FsxFormikCheckbox name="isVisible" label="Is Visible" className="mt-3" />
        <FsxFormikCheckbox name="isActive" label="Is Active" className="mt-3" />
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && data && data.data && (
        <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
          <GridColumn
            field="formPage.name"
            title="Form Page"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn field="name" title="Name" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn
            field="customFieldType.name"
            title="Type"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="isRequired"
            title="Is Required"
            filter={'text'}
            columnMenu={KGridMenuFilter}
            cell={cellItemIsRequired}
          />
          <GridColumn
            field="isVisible"
            title="Is Visible"
            filter={'text'}
            columnMenu={KGridMenuFilter}
            cell={cellItemIsVisible}
          />
          <GridColumn
            field="isActive"
            title="Is Active"
            filter={'text'}
            columnMenu={KGridMenuFilter}
            cell={cellItemIsActive}
          />
        </FsxGrid>
      )}
    </>
  );
};

export default CustomFieldEntry;
