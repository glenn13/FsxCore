import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import {FsxFormikDropDownListProps} from '@app/components/common/FsxFormik/FsxFormikDropDownList';
import React from 'react';
import {useCustomers} from '@app/services/crm/sales/customers.service';

export type CountriesDropdownProps = FsxFormikDropDownListProps & {};

const CountriesDropdown: React.FC<CountriesDropdownProps> = ({...rest}) => {
  const {isLoading, data: countries} = useCustomers();
  return (
    <FsxFormikDropDownList
      {...rest}
      loading={isLoading}
      dataItemKey="id"
      textField="name"
      data={countries?.data}
      filterable
    />
  );
};

export default React.memo(CountriesDropdown);
