import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useStockConditions } from '@app/services/stock/standardentries/stockCondition.service';


export type StockConditionDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const StockConditionDropdown: React.FC<StockConditionDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const stockconditions = useStockConditions();

    const props = {
        ...rest,
        name: name || 'StockConditionId',
        label: label || 'Stock Conditions:',
        dataItemKey: 'id',
        textField: 'title',
        data: stockconditions.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(StockConditionDropdown);
