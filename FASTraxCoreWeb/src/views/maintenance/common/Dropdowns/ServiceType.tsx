import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useServiceTypes} from '@app/services/maintenance/standardentries/serviceType.service';

export type ServiceTypeDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const ServiceTypeDropdown: React.FC<ServiceTypeDropdownProps> = ({name, label, isFormik, textField, ...rest}) => {
  const serviceTypes = useServiceTypes();

  const props = {
    ...rest,
    name: name || 'serviceTypeId',
    label: label || 'Service Type:',
    dataItemKey: 'id',
    textField: 'description',
    data: serviceTypes.data?.data || [],
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(ServiceTypeDropdown);
