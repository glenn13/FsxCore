import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useCustomFieldTypes} from '@app/services/asset/standardentries/customFieldType.service';

export type CustomFieldTypeDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const CustomFieldTypeDropdown: React.FC<CustomFieldTypeDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const customFields = useCustomFieldTypes();

  const props = {
    ...rest,
    name: name || 'customFieldTypeId',
    label: label || 'Custom Field Type:',
    dataItemKey: 'id',
    textField: 'name',
    data: customFields.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(CustomFieldTypeDropdown);
