import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useRepairCategories} from '@app/services/maintenance/standardentries/repairCategory.service';

export type RepairCategoryDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const RepairCategoryDropdown: React.FC<RepairCategoryDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const repairCategories = useRepairCategories();

    const props = {
        ...rest,
        name: name || 'repairCategoryId',
        label: label || 'Repair Category:',
        dataItemKey: 'id',
        textField: 'title',
        data: repairCategories.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(RepairCategoryDropdown);
