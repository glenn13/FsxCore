import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import { useDepreciationMethods } from '@app/services/finance/standardentries/depreciations.service';

export type DepreciationMethodsDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const DepreciationMethodsDropdown: React.FC<DepreciationMethodsDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const depreciationMethods = useDepreciationMethods();
  
  const props = {
    ...rest,
    name: name || 'depreciationMethodId',
    label: label || 'Depreciation Method:',
    dataItemKey: 'id',
    textField: 'name',
    data: depreciationMethods.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(DepreciationMethodsDropdown);
