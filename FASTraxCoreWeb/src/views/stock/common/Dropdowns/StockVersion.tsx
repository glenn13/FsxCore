import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useStockVersions } from '@app/services/stock/standardentries/stockVersion.service';


export type StockVersionDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const StockVersionDropdown: React.FC<StockVersionDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const versions = useStockVersions();

    const props = {
        ...rest,
        name: name || 'StockVersionId',
        label: label || 'Stock Version:',
        dataItemKey: 'id',
        textField: 'title',
        data: versions.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(StockVersionDropdown);
