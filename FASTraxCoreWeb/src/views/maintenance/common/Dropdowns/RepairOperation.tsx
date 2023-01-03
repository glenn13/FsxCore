import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useRepairOperations} from '@app/services/maintenance/standardentries/repairOperation.service';

export type RepairOperationDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const RepairOperationDropdown: React.FC<RepairOperationDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const repairOperations = useRepairOperations();

  const props = {
    ...rest,
    name: name || 'repairOperationId',
    label: label || 'Repair Operation:',
    dataItemKey: 'id',
    textField: 'description',
    data: repairOperations.data?.data || [],
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(RepairOperationDropdown);
