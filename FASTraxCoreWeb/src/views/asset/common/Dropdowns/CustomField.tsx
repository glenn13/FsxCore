import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useCustomFields} from '@app/services/asset/standardentries/customField.service';

export type CustomFieldDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const CustomFieldDropdown: React.FC<CustomFieldDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const customFields = useCustomFields();

  const props = {
    ...rest,
    name: name || 'customFieldId',
    label: label || 'Custom Field:',
    dataItemKey: 'id',
    textField: 'name',
    data: customFields.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(CustomFieldDropdown);
