import React from 'react';
import { useAssetModels } from '@app/services/asset/standardentries/assetModel.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetModelDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
    assetManufacturerId: number;
};

const AssetModelDropdown: React.FC<AssetModelDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    assetManufacturerId,
  ...rest
}) => {
  const models = useAssetModels();
  const data = React.useMemo(() => {
      return models.data?.data.filter(d => d.assetManufacturerId === assetManufacturerId);
  }, [models, assetManufacturerId]);

  const props = {
    ...rest,
    name: name || 'assetModelId',
    label: label || 'Model:',
    dataItemKey: 'id',
    textField: 'title',
    filterKey: 'assetManufacturerId',
    filterValue: assetManufacturerId,
    data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetModelDropdown);
