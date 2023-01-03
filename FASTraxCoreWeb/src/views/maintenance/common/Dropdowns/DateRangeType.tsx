import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useDateRangeTypes} from '@app/services/maintenance/standardentries/dateRangeType.service';

export type DateRangeTypeDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const DateRangeTypeDropdown: React.FC<DateRangeTypeDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const dateRangeTypes = useDateRangeTypes();

    const props = {
        ...rest,
        name: name || 'dateRangeTypesId',
        label: label || 'Date Range Type:',
        dataItemKey: 'id',
        textField: 'title',
        data: dateRangeTypes.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(DateRangeTypeDropdown);
