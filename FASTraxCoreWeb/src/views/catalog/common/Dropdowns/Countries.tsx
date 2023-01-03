import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import {FsxFormikDropDownListProps} from '@fsxFormik/FsxFormikDropDownList';
import React from 'react';
import {useCountries} from '@app/services/catalog/countries.service';

export type CountriesDropdownProps = FsxFormikDropDownListProps & {};

const CountriesDropdown: React.FC<CountriesDropdownProps> = ({...rest}) => {
  const {isLoading, data: countries} = useCountries();
  return (
    <FsxFormikDropDownList
      {...rest}
      loading={isLoading}
      dataItemKey="id"
      textField="title"
      data={countries}
      filterable
    />
  );
};

export default React.memo(CountriesDropdown);
