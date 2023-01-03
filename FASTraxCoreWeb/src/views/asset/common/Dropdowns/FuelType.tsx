import React from 'react';
import { useFuelTypes } from '@app/services/asset/standardentries/fuelTypes.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type FuelTypeDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const FuelTypeDropdown: React.FC<FuelTypeDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const fuelTypes = useFuelTypes();

  const props = {
    ...rest,
    name: name || 'fuelTypeId',
    label: label || 'Fuel Type:',
    dataItemKey: 'id',
    textField: 'title',
    data: fuelTypes.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(FuelTypeDropdown);
