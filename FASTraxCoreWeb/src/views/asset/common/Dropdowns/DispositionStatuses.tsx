import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useDispositionStatus} from '@app/services/asset/disposition/status.service';

export type DispositionStatusesDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const DispositionStatusesDropdown: React.FC<DispositionStatusesDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const dispositionaStatus = useDispositionStatus();

  const props = {
    ...rest,
    name: name || 'dispositionStatusId',
    label: label || 'Disposition Status:',
    dataItemKey: 'id',
    textField: 'title',
    data: dispositionaStatus.data?.data || [],
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(DispositionStatusesDropdown);
