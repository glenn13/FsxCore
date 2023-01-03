import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useCommoditySizes } from '@app/services/stock/standardentries/commoditySize.service';


export type CommoditySizeDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const CommoditySizeDropdown: React.FC<CommoditySizeDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
    const commoditySizes = useCommoditySizes();

    const props = {
        ...rest,
        name: name || 'CommoditySizeId',
        label: label || 'Commodity Size:',
        dataItemKey: 'id',
        textField: 'title',
        data: commoditySizes.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(CommoditySizeDropdown);
