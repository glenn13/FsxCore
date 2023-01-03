import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, { FsxDropdownProps } from '@app/components/common/Dropdown';
import { useAssetItemNames } from '@app/services/asset/standardentries/assetItemName.service';

export type AssetItemNameDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
    assetGroupId: number;
};

const AssetItemNameDropdown: React.FC<AssetItemNameDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    assetGroupId,
    ...rest
}) => {

    const { data: itemNameData, isLoading: fetchingItemNames } = useAssetItemNames();

    const data = React.useMemo(() => {
        return itemNameData?.data.filter(d => d.assetGroupId === assetGroupId);
    }, [itemNameData, assetGroupId]);

    const props = {
        ...rest,
        name: name || 'assetItemNameId',
        label: label || 'Asset Name :',
        dataItemKey: 'id',
        textField: 'title',
        data,
        loading: fetchingItemNames,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} filterable />;

    return <FsxDropdown {...props} />;
};

export default React.memo(AssetItemNameDropdown);
