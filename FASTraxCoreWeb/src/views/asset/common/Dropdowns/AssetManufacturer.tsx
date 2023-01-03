import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import { useAssetManufacturers } from '@app/services/asset/standardentries/assetManufacturer.service';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetManufacturerDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
    assetTypeId: number;
};

const AssetManufacturerDropdown: React.FC<AssetManufacturerDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    assetTypeId,
    ...rest }) => {

    const manufacturers = useAssetManufacturers();

    const data = React.useMemo(() => {
        return manufacturers.data?.data.filter(d => d.assetTypeId === assetTypeId);
    }, [manufacturers, assetTypeId]);

  const props = {
    ...rest,
    dataItemKey: 'id',
    name: name || 'assetManufacturerId',
    label: label || 'Manufacturer',
    data,
    textField: textField || 'title',
  };

    if (isFormik) return <FsxFormikDropDownList {...props} filterable={true} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetManufacturerDropdown);
