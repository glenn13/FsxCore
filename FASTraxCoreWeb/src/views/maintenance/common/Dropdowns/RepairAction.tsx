import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useRepairActions} from '@app/services/maintenance/standardentries/repairAction.service';

export type RepairActionDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const RepairActionDropdown: React.FC<RepairActionDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const repairActions = useRepairActions();

  const props = {
    ...rest,
    name: name || 'repairActionId',
    label: label || 'Repair Action:',
    dataItemKey: 'id',
    textField: 'description',
    data: repairActions.data?.data || [],
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(RepairActionDropdown);
