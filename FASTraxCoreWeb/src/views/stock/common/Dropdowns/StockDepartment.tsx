import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useStockDepartments } from '@app/services/stock/standardentries/stockDepartment.service';


export type StockDeparmentDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const StockDepartmentDropdown: React.FC<StockDeparmentDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const departments = useStockDepartments();

    const props = {
        ...rest,
        name: name || 'StockDepartmentId',
        label: label || 'Stock Department:',
        dataItemKey: 'id',
        textField: 'title',
        data: departments.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(StockDepartmentDropdown);
