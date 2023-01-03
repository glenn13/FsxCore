import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useMaintenanceStatuses} from '@app/services/maintenance/standardentries/maintenanceStatus.service';

export type MaintenanceStatusesDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const MaintenanceStatusesDropdown: React.FC<MaintenanceStatusesDropdownProps> = ({
  name,
  label,
  isFormik,
  ...rest
}) => {
  const maintenanceStatuses = useMaintenanceStatuses();

  const props = {
    ...rest,
    name: name || 'maintenanceStatusId',
    label: label || 'Maintenance Status:',
    dataItemKey: 'id',
    textField: 'title',
    data: maintenanceStatuses.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(MaintenanceStatusesDropdown);
