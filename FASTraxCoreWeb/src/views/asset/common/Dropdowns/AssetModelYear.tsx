import React from 'react';
import { useAssetModelYears } from '@app/services/asset/standardentries/assetModelYear.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type AssetModelYearDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const AssetModelYearDropdown: React.FC<AssetModelYearDropdownProps> = ({
    isFormik,
    name,
    label,
    ...rest
}) => {
    const modelYears = useAssetModelYears();

  //const data = React.useMemo(() => {
  //  return modelYears.data?.data.filter(d => d.assetModelId === assetModelId);
  //}, [modelYears.data, assetModelId]);

  const props = {
    ...rest,
    name: name || 'assetModelYearId',
    label: label || 'Model Year:',
    dataItemKey: 'id',
    textField: 'title',
    data: modelYears.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(AssetModelYearDropdown);
