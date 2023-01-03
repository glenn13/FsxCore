import React from 'react';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {usePaymentTypes} from '@app/services/finance/standardentries/paymentType.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';

export type PaymentTypesDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const PaymentTypesDropdown: React.FC<PaymentTypesDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const paymentTypes = usePaymentTypes();
  
  const props = {
    ...rest,
    name: name || 'paymentTypeId',
    label: label || 'Payment Type:',
    dataItemKey: 'id',
    textField: 'name',
    data: paymentTypes.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(PaymentTypesDropdown);
