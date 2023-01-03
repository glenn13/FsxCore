import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useCommodityItemNames } from '@app/services/stock/standardentries/commodityItemName.service';


export type CommodityItemNameDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const CommodityItemNameDropdown: React.FC<CommodityItemNameDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const commodityitemnames = useCommodityItemNames();

    const props = {
        ...rest,
        name: name || 'commodityItemNameId',
        label: label || 'Commodity Item Name :',
        dataItemKey: 'id',
        textField: 'title',
        data: commodityitemnames.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} filterable />;

    return <FsxDropdown {...props} />;
};

export default React.memo(CommodityItemNameDropdown);
