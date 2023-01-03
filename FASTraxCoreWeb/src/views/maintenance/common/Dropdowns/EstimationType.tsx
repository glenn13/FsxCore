import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useEstimationTypes} from '@app/services/maintenance/standardentries/estimationType.service';

export type EstimationTypeDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const EstimationTypeDropdown: React.FC<EstimationTypeDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

    const estimationTypes = useEstimationTypes();

    const props = {
        ...rest,
        name: name || 'estimationTypeId',
        label: label || 'Estimation Type:',
        dataItemKey: 'id',
        textField: 'title',
        data: estimationTypes.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(EstimationTypeDropdown);
