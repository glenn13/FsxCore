import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useRepairLevels} from '@app/services/maintenance/standardentries/repairLevel.service';

export type RepairLevelDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const RepairLevelDropdown: React.FC<RepairLevelDropdownProps> = ({name, label, isFormik, textField, ...rest}) => {
  const repairLevels = useRepairLevels();

  const props = {
    ...rest,
    name: name || 'repairLevelId',
    label: label || 'Repair Level:',
    dataItemKey: 'id',
    textField: 'description',
    data: repairLevels.data?.data || [],
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(RepairLevelDropdown);
