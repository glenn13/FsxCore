import React from 'react';
import { useAssetGroups } from '@app/services/asset/standardentries/assetGroup.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetGroupDrowndownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const AssetGroupDrowndown: React.FC<AssetGroupDrowndownProps> = ({name,
  label,
  isFormik,
  textField,
  ...rest}) => {

  const assetGroups = useAssetGroups();

  const props = {
    ...rest,
    name: name || 'assetGroupId',
    label: label || 'Asset Group:',
    dataItemKey: 'id',
    textField: 'title',
    data: assetGroups.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetGroupDrowndown);
