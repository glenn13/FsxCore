import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useDispositionType} from '@app/services/asset/disposition/type.service';

export type DispositionTypesDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const DispositionTypesDropdown: React.FC<DispositionTypesDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const dispositionType = useDispositionType();

  const props = {
    ...rest,
    name: name || 'dispositionTypeId',
    label: label || 'Disposition Type:',
    dataItemKey: 'id',
    textField: 'title',
    data: dispositionType.data?.data || [],
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(DispositionTypesDropdown);
