import React from 'react';
import { useAssetUOM } from '@app/services/asset/standardentries/assetUOM.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetUOMDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const AssetUOMDropdown: React.FC<AssetUOMDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const uoms = useAssetUOM();

  const props = {
    ...rest,
    name: name || 'assetUOMId',
    label: label || 'Unit Type:',
    dataItemKey: 'id',
    textField: 'title',
    data: uoms.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetUOMDropdown);
