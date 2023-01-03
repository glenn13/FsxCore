import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useRepairGroups} from '@app/services/maintenance/standardentries/repairGroup.service';

export type RepairGroupDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const RepairGroupDropdown: React.FC<RepairGroupDropdownProps> = ({name, label, isFormik, textField, ...rest}) => {
  const repairGroups = useRepairGroups();

  const props = {
    ...rest,
    name: name || 'repairGroupId',
    label: label || 'Repair Group:',
    dataItemKey: 'id',
    textField: 'description',
    data: repairGroups.data?.data || [],
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(RepairGroupDropdown);
