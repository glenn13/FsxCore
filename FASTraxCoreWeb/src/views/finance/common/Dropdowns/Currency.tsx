import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '../../../../components/common/Dropdown';
import {useCurrencies} from '@app/services/finance/standardentries/currency.service';
import _ from 'lodash';

export type CurrencyDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const currencies = useCurrencies();

  const props = {
    ...rest,
    name: name || 'currencyId',
    label: label || 'Currency',
    dataItemKey: 'id',
    textField: 'code',
    data: _.sortBy(currencies.data?.data, d => d.id),
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(CurrencyDropdown);
