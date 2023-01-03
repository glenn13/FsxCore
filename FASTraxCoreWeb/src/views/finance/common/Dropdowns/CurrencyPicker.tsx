import React, {InputHTMLAttributes} from 'react';
import FsxFormikDropTable from '@app/components/common/FsxFormik/FsxFormikDropTable';
import {useCurrencies} from '@app/services/finance/standardentries/currency.service';
import {GridColumn} from '@app/helpers/types';
import _ from 'lodash';

export interface CurrencyDropdownProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({name, label, ...rest}) => {
  const {isLoading, data: currencies} = useCurrencies();

  const columns: GridColumn[] = [
    {field: 'code', title: 'Code'},
    {field: 'title', title: 'Title', width: 300},
  ];

  const props = {
    ...rest,
    name: name || 'currencyId',
    label: label || 'Currency',
    dataItemKey: 'id',
    textField: 'code',
    data: _.sortBy(currencies?.data, d => d.id),
  };

  return <FsxFormikDropTable isLoading={isLoading} columns={columns} {...props} />;
};

export default React.memo(CurrencyDropdown);
