import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useCommodityBrands } from '@app/services/stock/standardentries/commodityBrand.service';


export type CommodityBrandDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const CommodityBrandDropdown: React.FC<CommodityBrandDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const commoditybrands = useCommodityBrands();

    const props = {
        ...rest,
        name: name || 'commodityBrandId',
        label: label || 'Commodity Brand:',
        dataItemKey: 'id',
        textField: 'title',
        data: commoditybrands.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} filterable/>;

    return <FsxDropdown {...props} />;
};

export default React.memo(CommodityBrandDropdown);
