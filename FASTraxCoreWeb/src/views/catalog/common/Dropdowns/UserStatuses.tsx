import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import {FsxFormikDropDownListProps} from '@app/components/common/FsxFormik/FsxFormikDropDownList';
import React from 'react';
import {useUserStatuses} from '@app/services/catalog/userstatus.service';

export type UserStatusDropdownProps = FsxFormikDropDownListProps & {};

const UserStatusDropdown: React.FC<UserStatusDropdownProps> = ({...rest}) => {
  const {isLoading, userStatuses} = useUserStatuses();
  return (
    <FsxFormikDropDownList
      {...rest}
      loading={isLoading}
      dataItemKey="id"
      textField="title"
      data={userStatuses}
    />
  );
};

export default React.memo(UserStatusDropdown);
