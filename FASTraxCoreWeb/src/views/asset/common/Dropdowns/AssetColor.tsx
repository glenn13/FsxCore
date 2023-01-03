import React from 'react';
import { useAssetColors } from '@app/services/asset/standardentries/assetColor.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetColorDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const AssetColorDropdown: React.FC<AssetColorDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
    const colors = useAssetColors();

  const props = {
    ...rest,
    name: name || 'assetColorId',
    label: label || 'Color:',
    dataItemKey: 'id',
    textField: 'title',
    data: colors.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetColorDropdown);
