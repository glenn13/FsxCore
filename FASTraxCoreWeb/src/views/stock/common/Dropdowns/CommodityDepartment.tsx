import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useCommodityDepartments } from '@app/services/stock/standardentries/commodityDepartment.service';


export type CommodityDepartmentDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const CommodityDepartmentDropdown: React.FC<CommodityDepartmentDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const commoditydepartments = useCommodityDepartments();

    const props = {
        ...rest,
        name: name || 'CommodityDepartmentId',
        label: label || 'Commodity Department:',
        dataItemKey: 'id',
        textField: 'title',
        data: commoditydepartments.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(CommodityDepartmentDropdown);
