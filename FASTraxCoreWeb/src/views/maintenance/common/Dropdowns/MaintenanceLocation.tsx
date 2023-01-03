import React from 'react';
import { FsxFormikDropDownList } from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useMaintenanceLocations} from '@app/services/maintenance/standardentries/maintenanceLocation.service';

export type MaintenanceLocationDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const MaintenanceLocationDropdown: React.FC<MaintenanceLocationDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {

  const maintenanceLocations = useMaintenanceLocations();

    const props = {
        ...rest,
        name: name || 'maintenanceLocationId',
        label: label || 'Location:',
        dataItemKey: 'id',
        textField: 'title',
        data: maintenanceLocations.data?.data || [],
    };

    if (isFormik) return <FsxFormikDropDownList {...props} />;

    return <FsxDropdown {...props} />;
};

export default React.memo(MaintenanceLocationDropdown);
