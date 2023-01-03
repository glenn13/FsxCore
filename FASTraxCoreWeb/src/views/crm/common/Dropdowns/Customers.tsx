import React from 'react';
import {useCustomers} from '@app/services/crm/sales/customers.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type CustomersDrowndownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const CustomersDrowndown: React.FC<CustomersDrowndownProps> = ({
  isFormik,
  label,
  name,
  ...rest
}) => {
  const customers = useCustomers();

  const props = {
    ...rest,
    name: name || 'customerId',
    label: label || 'Customer:',
    dataItemKey: 'id',
    textField: 'name',
    data: customers.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(CustomersDrowndown);
