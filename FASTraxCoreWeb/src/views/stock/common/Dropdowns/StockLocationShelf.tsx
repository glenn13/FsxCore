import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useStockLocationShelfs } from '@app/services/stock/standardentries/stockLocationShelf.service';


export type StockLocationShelfDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const StockLocationShelfDropdown: React.FC<StockLocationShelfDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const stocklocationshelfs = useStockLocationShelfs();

    const props = {
        ...rest,
        name: name || 'StockLocationShelfId',
        label: label || 'Stock Location Shelf:',
        dataItemKey: 'id',
        textField: 'title',
        data: stocklocationshelfs.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(StockLocationShelfDropdown);
