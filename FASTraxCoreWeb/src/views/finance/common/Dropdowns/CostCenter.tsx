import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '../../../../components/common/Dropdown';
import {useCostCenters} from '@app/services/finance/standardentries/costCenter.service';

export type CostCenterDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const CostCenterDropdown: React.FC<CostCenterDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const costCenters = useCostCenters();

  const props = {
    ...rest,
    name: name || 'costCenterId',
    label: label || 'Cost Center :',
    dataItemKey: 'id',
    textField: 'title',
    data: costCenters.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(CostCenterDropdown);
