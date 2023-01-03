import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useRepairSubGroups} from '@app/services/maintenance/standardentries/repairSubGroup.service';

export type RepairSubGroupDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const RepairSubGroupDropdown: React.FC<RepairSubGroupDropdownProps> = ({name, label, isFormik, textField, ...rest}) => {
  const repairSubGroups = useRepairSubGroups();

  const props = {
    ...rest,
    name: name || 'repairSubGroupId',
    label: label || 'Repair Sub-Group:',
    dataItemKey: 'id',
    textField: 'description',
    data: repairSubGroups.data?.data || [],
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(RepairSubGroupDropdown);
