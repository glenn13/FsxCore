import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import { useWarrantyTypes } from '@app/services/asset/standardentries/warrantyType.service';

export type WarrantyTypeDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const WarrantyTypeDropdown: React.FC<WarrantyTypeDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {

  const warrantyTypes = useWarrantyTypes();

  const props = {
    ...rest,
    name: name || 'warrantyTypeId',
    label: label || 'Warranty Type:',
    dataItemKey: 'id',
    textField: 'name',
    data: warrantyTypes.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(WarrantyTypeDropdown);
