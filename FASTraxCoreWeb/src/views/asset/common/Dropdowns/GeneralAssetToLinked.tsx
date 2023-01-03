import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import { useGeneralAssetToLinked } from '@app/services/asset/register/generalasset.service';

export type GeneralAssetToLinkedDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
  parentGeneralAssetId?: number;
  currentLinkedAssetId?: number[];
};

const GeneralAssetToLinkedDropdown: React.FC<GeneralAssetToLinkedDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  parentGeneralAssetId,
  currentLinkedAssetId,
  ...rest
}) => {

  const linkedAssets = useGeneralAssetToLinked(parentGeneralAssetId || 0);

  const data = React.useMemo(() => {
    return linkedAssets.data?.data.filter(d => !currentLinkedAssetId?.includes(d.linkedGeneralAssetId));
  }, [linkedAssets, currentLinkedAssetId]);

  const props = {
    ...rest,
    name: name || 'linkedGeneralAssetId',
    label: label || 'Asset ID:',
    dataItemKey: 'linkedGeneralAssetId',
    textField: 'assetRefId',
    data,
    //data: linkedAssets.data?.data,
    
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(GeneralAssetToLinkedDropdown);
