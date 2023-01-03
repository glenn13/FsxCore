import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useApprovalStatuses } from '@app/services/maintenance/standardentries/approvalStatus.service';

export type ApprovalStatusDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const ApprovalStatusDropdown: React.FC<ApprovalStatusDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const approvalStatuses = useApprovalStatuses();

    const props = {
        ...rest,
        name: name || 'approvalStatusId',
        label: label || 'Approval Status:',
        dataItemKey: 'id',
        textField: 'title',
        data: approvalStatuses.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(ApprovalStatusDropdown);
