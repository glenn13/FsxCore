import React from 'react';
import { useFuelTankSize } from '@app/services/asset/standardentries/fuelTankSize.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type FuelTankSizeDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const FuelTankSizeDropdown: React.FC<FuelTankSizeDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const fuelTankSize = useFuelTankSize();

  const props = {
    ...rest,
    name: name || 'fuelTankSizeId',
    label: label || 'Fuel Tank Size:',
    dataItemKey: 'id',
    textField: 'name',
    data: fuelTankSize.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(FuelTankSizeDropdown);
