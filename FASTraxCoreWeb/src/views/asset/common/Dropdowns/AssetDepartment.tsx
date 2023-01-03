import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useAssetDepartments } from '@app/services/asset/standardentries/assetDepartment.service';

export type AssetDepartmentDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const AssetDepartmentDropdown: React.FC<AssetDepartmentDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const departments = useAssetDepartments();

    const props = {
        ...rest,
        name: name || 'assetDepartmentId',
        label: label || 'Department :',
        dataItemKey: 'id',
        textField: 'title',
        data: departments.data?.data,
    };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetDepartmentDropdown);
