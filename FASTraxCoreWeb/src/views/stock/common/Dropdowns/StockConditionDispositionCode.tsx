import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useStockConditionDispositionCodes } from '@app/services/stock/standardentries/stockConditionDispositionCode.service';


export type StockConditionDispositionCodeDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const StockConditionDispositionCodeDropdown: React.FC<StockConditionDispositionCodeDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const stockconditiondispositioncodes = useStockConditionDispositionCodes();

    const props = {
        ...rest,
        name: name || 'StockConditionDispositionCodeId',
        label: label || 'Stock Condition Disposition Codes:',
        dataItemKey: 'id',
        textField: 'title',
        data: stockconditiondispositioncodes.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(StockConditionDispositionCodeDropdown);
