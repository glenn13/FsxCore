import React from 'react';
import {useDispositionRequiredRepairs} from '@app/services/asset/standardentries/dispositionRequiredRepairs.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type DispositionRequiredRepairDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
  currentRequiredRepairId?: number[];
};

const DispositionRequiredRepairDropdown: React.FC<DispositionRequiredRepairDropdownProps> = ({
  isFormik,
  name,
  label,
  currentRequiredRepairId,
  ...rest
}) => {
  const requiredRepairs = useDispositionRequiredRepairs();

  const data = React.useMemo(() => {
    return requiredRepairs.data?.data.filter(d => !currentRequiredRepairId?.includes(d.id));
  }, [requiredRepairs, currentRequiredRepairId]);

  const props = {
    ...rest,
    name: name || 'dispositionRequiredRepairId',
    label: label || 'Required Repair:',
    dataItemKey: 'id',
    textField: 'name',
    data: data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(DispositionRequiredRepairDropdown);
