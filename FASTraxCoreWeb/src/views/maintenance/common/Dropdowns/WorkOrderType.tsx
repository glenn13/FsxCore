import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useWorkOrderTypes} from '@app/services/maintenance/standardentries/workOrderType.service';

export type WorkOrderTypeDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const WorkOrderTypeDropdown: React.FC<WorkOrderTypeDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const workOrderTypes = useWorkOrderTypes();

    const props = {
        ...rest,
        name: name || 'workOrderTypeId',
        label: label || 'Work Order Type:',
        dataItemKey: 'id',
        textField: 'title',
        data: workOrderTypes.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(WorkOrderTypeDropdown);
