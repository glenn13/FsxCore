import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useCommodityModels } from '@app/services/stock/standardentries/commodityModel.service';


export type CommodityModelDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const CommodityModelDropdown: React.FC<CommodityModelDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const commodityModels = useCommodityModels();

    const props = {
        ...rest,
        name: name || 'CommodityModelId',
        label: label || 'Commodity Model:',
        dataItemKey: 'id',
        textField: 'title',
        data: commodityModels.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(CommodityModelDropdown);
