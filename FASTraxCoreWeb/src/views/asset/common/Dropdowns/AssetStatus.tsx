import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import { useAssetStatus } from '@app/services/asset/standardentries/assetStatus.service';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetStatusDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const AssetStatusDropdown: React.FC<AssetStatusDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const assetStatus = useAssetStatus();

  const props = {
    ...rest,
    name: name || 'assetStatusId',
    label: label || 'Asset Status:',
    dataItemKey: 'id',
    textField: 'title',
    data: assetStatus.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetStatusDropdown);
