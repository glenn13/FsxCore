import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import { useAssetLocations } from '@app/services/asset/standardentries/assetLocation.service';

export type AssetLocationDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const AssetLocationDropdown: React.FC<AssetLocationDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {

  const assetLocations = useAssetLocations();

  const props = {
    ...rest,
    name: name || 'assetLocationId',
    label: label || 'Location Name:',
    dataItemKey: 'id',
    textField: 'name',
    data: assetLocations.data?.data || [],
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetLocationDropdown);
