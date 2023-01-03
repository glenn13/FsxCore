import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useDispositionApprovalStatus} from '@app/services/asset/disposition/approvalStatus.service';

export type DispositionApprovalStatusDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const DispositionApprovalStatusDropdown: React.FC<DispositionApprovalStatusDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const dispositionApprovalStatus = useDispositionApprovalStatus();

  const props = {
    ...rest,
    name: name || 'dispositionApprovalStatusId',
    label: label || 'Disposition Approval Status:',
    dataItemKey: 'id',
    textField: 'title',
    data: dispositionApprovalStatus.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(DispositionApprovalStatusDropdown);
