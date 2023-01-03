import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useStockConditionStatusCodes } from '@app/services/stock/standardentries/stockConditionStatusCode.service';


export type StockConditionStatusCodeDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const StockConditionStatusCodeDropdown: React.FC<StockConditionStatusCodeDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const stockconditionstatuscodes = useStockConditionStatusCodes();

    const props = {
        ...rest,
        name: name || 'StockConditionStatusCodeId',
        label: label || 'Stock Condition Status Code:',
        dataItemKey: 'id',
        textField: 'title',
        data: stockconditionstatuscodes.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(StockConditionStatusCodeDropdown);
