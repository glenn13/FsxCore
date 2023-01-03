import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useStockSeries } from '@app/services/stock/standardentries/stockSeries.service';


export type StockSeriesDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const StockSeriesDropdown: React.FC<StockSeriesDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const series = useStockSeries();

    const props = {
        ...rest,
        name: name || 'StockSeriesId',
        label: label || 'Stock Series:',
        dataItemKey: 'id',
        textField: 'title',
        data: series.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(StockSeriesDropdown);
