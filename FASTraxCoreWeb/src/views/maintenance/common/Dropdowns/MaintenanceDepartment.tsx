import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useMaintenanceDepartments} from '@app/services/maintenance/standardentries/maintenanceDepartment.service';

export type MaintenanceDepartmentDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const MaintenanceDepartmentDropdown: React.FC<MaintenanceDepartmentDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const maintenanceDepartments = useMaintenanceDepartments();

    const props = {
        ...rest,
        name: name || 'maintenanceDepartmentId',
        label: label || 'Department:',
        dataItemKey: 'id',
        textField: 'title',
        data: maintenanceDepartments.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(MaintenanceDepartmentDropdown);
