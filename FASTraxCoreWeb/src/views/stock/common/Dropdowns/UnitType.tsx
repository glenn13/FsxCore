import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useUnitTypes } from '@app/services/stock/standardentries/unitType.service';


export type UniTypeDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const UniTypeDropdown: React.FC<UniTypeDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const unittypes = useUnitTypes();

    const props = {
        ...rest,
        name: name || 'UnitTypeId',
        label: label || 'Unit Type:',
        dataItemKey: 'id',
        textField: 'title',
        data: unittypes.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(UniTypeDropdown);
