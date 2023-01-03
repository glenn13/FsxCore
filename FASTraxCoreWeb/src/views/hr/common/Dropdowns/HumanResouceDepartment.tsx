import React from 'react';
import { useHumanResourceDepartments } from '@app/services/hr/standardentries/humanResourceDepartment.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type HumanResourceDepartmentDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const HumanResourceDepartmentDropdown: React.FC<HumanResourceDepartmentDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
    const departments = useHumanResourceDepartments();

  const props = {
    ...rest,
    name: name || 'humanResourceDepartmentId',
    label: label || 'Department :',
    dataItemKey: 'id',
    textField: 'title',
    data: departments.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} filterable />;

  return <FsxDropdown {...props} />;
};

export default React.memo(HumanResourceDepartmentDropdown);
