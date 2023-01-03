import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useRepairStatuses} from '@app/services/maintenance/standardentries/repairStatus.service';

export type RepairStatusDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const RepairStatusDropdown: React.FC<RepairStatusDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const repairStatuses = useRepairStatuses();

    const props = {
        ...rest,
        name: name || 'repairStatusId',
        label: label || 'Repair Status:',
        dataItemKey: 'id',
        textField: 'title',
        data: repairStatuses.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(RepairStatusDropdown);
