import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import { useCommodityGroups } from '@app/services/stock/standardentries/commodityGroup.service';
import React from 'react';


export type CommodityGroupDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const CommodityGroupDropdown: React.FC<CommodityGroupDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const commoditygroups = useCommodityGroups();

    const props = {
        ...rest,
        name: name || 'commodityGroupId',
        label: label || 'Commodity Group:',
        dataItemKey: 'id',
        textField: 'title',
        data: commoditygroups.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} filterable />;

    return <FsxDropdown {...props} />;
};

export default React.memo(CommodityGroupDropdown);
