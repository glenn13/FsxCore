import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useStockLocations } from '@app/services/stock/standardentries/stockLocation.service';


export type StockLocationDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const StockLocationDropdown: React.FC<StockLocationDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const stocklocations = useStockLocations();

    const props = {
        ...rest,
        name: name || 'StockLocationId',
        label: label || 'Stock Location:',
        dataItemKey: 'id',
        textField: 'title',
        data: stocklocations.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(StockLocationDropdown);
