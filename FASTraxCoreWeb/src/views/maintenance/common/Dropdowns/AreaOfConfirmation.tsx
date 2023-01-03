import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useAreaOfConfirmations} from '@app/services/maintenance/standardentries/areaOfConfirmation.service';

export type AreaOfConfirmationDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const AreaOfConfirmationDropdown: React.FC<AreaOfConfirmationDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const areaOfConfirmations = useAreaOfConfirmations();

    const props = {
        ...rest,
        name: name || 'areaOfConfirmationsId',
        label: label || 'Area of Confirmations:',
        dataItemKey: 'id',
        textField: 'title',
        data: areaOfConfirmations.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;

};

export default React.memo(AreaOfConfirmationDropdown);
