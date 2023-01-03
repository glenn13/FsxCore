import React from 'react';
import { useAssetSates } from '@app/services/asset/standardentries/assetState.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetStateDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const AssetStateDropdown: React.FC<AssetStateDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const assetStates = useAssetSates();

  const props = {
    ...rest,
    name: name || 'assetStateId',
    label: label || 'Asset State :',
    dataItemKey: 'id',
    textField: 'name',
    data: assetStates.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetStateDropdown);
