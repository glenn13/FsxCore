import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import { useDepreciationMethods } from '@app/services/finance/standardentries/depreciationperiodtype.service';

export type DepreciationPeriodTypeDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const DepreciationMethodsDropdown: React.FC<DepreciationPeriodTypeDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const depreciationPeriodTypes = useDepreciationMethods();

  const props = {
    ...rest,
    name: name || 'depreciationPeriodTypeId',
    label: label || 'Depreciation Period Type:',
    dataItemKey: 'id',
    textField: 'name',
    data: depreciationPeriodTypes.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(DepreciationMethodsDropdown);
