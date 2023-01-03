import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useCommodityItemNameGroups } from '@app/services/stock/standardentries/commodityItemNameGroup.service';


export type CommodityItemNameGroupDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const CommodityItemNameGroupDropdown: React.FC<CommodityItemNameGroupDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const commodityitemnamegroups = useCommodityItemNameGroups();

    const props = {
        ...rest,
        name: name || 'CommodityItemNameGroupId',
        label: label || 'Commodity Item Name Group:',
        dataItemKey: 'id',
        textField: 'title',
        data: commodityitemnamegroups.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(CommodityItemNameGroupDropdown);
