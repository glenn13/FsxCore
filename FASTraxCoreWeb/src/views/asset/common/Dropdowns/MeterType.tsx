import React from 'react';
import { useMeterTypes } from '@app/services/asset/standardentries/meterTypes.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type MeterTypesDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const MeterTypesDropdown: React.FC<MeterTypesDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const meterTypes = useMeterTypes();

  const props = {
    ...rest,
    name: name || 'meterTypeId',
    label: label || 'Meter Type:',
    dataItemKey: 'id',
    textField: 'title',
    data: meterTypes.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(MeterTypesDropdown);
