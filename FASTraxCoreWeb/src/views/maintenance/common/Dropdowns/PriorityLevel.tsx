import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {usePriorityLevels} from '@app/services/maintenance/standardentries/priorityLevel.service';

export type PriorityLevelDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const PriorityLevelDropdown: React.FC<PriorityLevelDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const priorityLevels = usePriorityLevels();

    const props = {
        ...rest,
        name: name || 'priorityLevelId',
        label: label || 'Priority Level:',
        dataItemKey: 'id',
        textField: 'title',
        data: priorityLevels.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};


export default React.memo(PriorityLevelDropdown);
