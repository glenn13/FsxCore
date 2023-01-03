import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useEstimationStatuses } from '@app/services/maintenance/standardentries/estimationStatus.service';


export type EstimationStatusDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const EstimationStatusDropdown: React.FC<EstimationStatusDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const estimationStatuses = useEstimationStatuses();

    const props = {
        ...rest,
        name: name || 'estimationStatusId',
        label: label || 'Estimation Status:',
        dataItemKey: 'id',
        textField: 'title',
        data: estimationStatuses.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(EstimationStatusDropdown);
