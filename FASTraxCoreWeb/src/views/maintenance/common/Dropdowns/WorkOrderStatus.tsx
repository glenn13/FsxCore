import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useWorkOrderStatuses} from '@app/services/maintenance/standardentries/workOrderStatus.service';

export type WorkOrderStatusDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const WorkOrderStatusDropdown: React.FC<WorkOrderStatusDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const workOrderStatuses = useWorkOrderStatuses();

    const props = {
        ...rest,
        name: name || 'workOrderStatusId',
        label: label || 'Work Order Status:',
        dataItemKey: 'id',
        textField: 'title',
        data: workOrderStatuses.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(WorkOrderStatusDropdown);
