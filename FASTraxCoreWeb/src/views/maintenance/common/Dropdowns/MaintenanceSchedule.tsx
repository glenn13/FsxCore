import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useMaintenanceSchedules} from '@app/services/maintenance/standardentries/maintenanceSchedule.service';

export type MaintenanceScheduleDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const MaintenanceScheduleDropdown: React.FC<MaintenanceScheduleDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const maintenanceSchedules = useMaintenanceSchedules();

    const props = {
        ...rest,
        name: name || 'maintenanceScheduleId',
        label: label || 'Schedule:',
        dataItemKey: 'id',
        textField: 'title',
        data: maintenanceSchedules.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(MaintenanceScheduleDropdown);
