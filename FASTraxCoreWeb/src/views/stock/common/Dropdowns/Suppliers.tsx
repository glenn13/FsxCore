import React from 'react';
import {useSuppliers} from '@app/services/scm/procurement/suppliers.service';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';

export type SuppliersDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const SuppliersDropdown: React.FC<SuppliersDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const suppliers = useSuppliers();

  const props = {
    ...rest,
    name: name || 'supplierId',
    label: label || 'Supplier:',
    dataItemKey: 'id',
    textField: 'name',
    data: suppliers.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(SuppliersDropdown);
