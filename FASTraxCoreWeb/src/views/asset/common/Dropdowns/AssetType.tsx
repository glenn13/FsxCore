import React from 'react';
import { useAssetTypes } from '@app/services/asset/standardentries/assetType.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetTypeDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
  assetCategoryId?: number;
};

const AssetTypeDropdown: React.FC<AssetTypeDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  assetCategoryId,
  ...rest
}) => {
    const assetTypes = useAssetTypes();
    const data = React.useMemo(() => {
        if (assetCategoryId !== undefined)
          return assetTypes.data?.data.filter(d => d.assetCategoryId === assetCategoryId);
        else 
          return assetTypes.data?.data;
    }, [assetTypes, assetCategoryId]);

    const props = {
    ...rest,
    name: name || 'assetTypeId',
    label: label || 'Asset Type:',
    dataItemKey: 'id',
    textField: 'title',
    filterKey: 'assetCategoryId',
    filterValue: assetCategoryId,
    data,
    };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetTypeDropdown);
