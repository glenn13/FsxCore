import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import { useAssetCategories } from '@app/services/asset/standardentries/assetCategory.service';

export type AssetCategoryDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
  excludeId?: number;
};

const AssetCategoryDropdown: React.FC<AssetCategoryDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  excludeId,
  ...rest
}) => {
  const categories = useAssetCategories();

  const data = React.useMemo(() => {
    return categories.data?.data.filter(d => d.id !== excludeId);
  }, [categories, excludeId]);

  const props = {
    ...rest,
    name: name || 'assetCategoryId',
    label: label || 'Asset Category:',
    dataItemKey: 'id',
    textField: 'title',
    data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetCategoryDropdown);
