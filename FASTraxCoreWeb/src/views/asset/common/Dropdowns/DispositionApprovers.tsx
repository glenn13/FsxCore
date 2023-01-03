import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useUsers} from '@app/queries';

export type DispositionApproversDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
  currentUserId?: number[];
};

const DispositionApproversDropdown: React.FC<DispositionApproversDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  currentUserId,
  ...rest
}) => {
  const approvers = useUsers();

  const data = React.useMemo(() => {
    return approvers.data?.data.filter(d => !currentUserId?.includes(d.id));
  }, [approvers, currentUserId]);

  const props = {
    ...rest,
    name: name || 'approverId',
    label: label || 'Approver Name:',
    dataItemKey: 'id',
    textField: 'title',
    data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(DispositionApproversDropdown);
