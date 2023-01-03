import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {usePersonnels} from '@app/services/hr/personnel.services';

export type PersonnelDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
};

const PersonnelDropdown: React.FC<PersonnelDropdownProps> = ({
    name,
    label,
    isFormik,
    textField,
    ...rest
}) => {
  const {data: employeesData, isLoading: fetchingEmployees} = usePersonnels();

    const { data: personnelsData, isLoading: fetchingPersonnels } = usePersonnels();

    const props = {
        ...rest,
        name: name || 'personnelId',
        label: label || 'Personnel :',
        dataItemKey: 'id',
        textField: 'personnelNo',
        data: personnelsData?.data,
        loading: fetchingPersonnels,
    };

  return <FsxDropdown {...props} />;
};

export default React.memo(PersonnelDropdown);
