import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import { useTransmissionTypes } from '@app/services/asset/standardentries/transmissionTypes.service';

export type TransmissionTypesDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const TransmissionTypesDropdown: React.FC<TransmissionTypesDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const transmissionTypes = useTransmissionTypes();

  const props = {
    ...rest,
    name: name || 'transmissionTypeId',
    label: label || 'Transmission Type:',
    dataItemKey: 'id',
    textField: 'title',
    data: transmissionTypes.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(TransmissionTypesDropdown);
