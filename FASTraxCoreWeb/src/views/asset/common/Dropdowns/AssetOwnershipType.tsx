import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import { useAssetOwnershipTypes } from '@app/services/asset/standardentries/assetOwnershipType.service';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetOwnershipTypeDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const AssetOwnershipTypeDropdown: React.FC<AssetOwnershipTypeDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
    const ownershipTypes = useAssetOwnershipTypes();

    const props = {
        ...rest,
        name: name || 'assetOwnershipTypeId',
        label: label || 'Ownership Type:',
        dataItemKey: 'id',
        textField: 'title',
        data: ownershipTypes.data?.data,
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(AssetOwnershipTypeDropdown);
