import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../store/rootReducer';
import {FsxDropdown} from '../../../../components/common';
import {loadUsers} from '../../../../store/catalog/users/actions';
import {FsxDropdownProps} from '../../../../components/common/Dropdown';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';

export type UsersDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
  currentUserId?: number[];
};

const userTextFields = {
  FIRSTNAME: 'firstName',
  LASTNAME: 'lastName',
  FULLNAME: 'fullName',
};

const UsersDropdown: React.FC<UsersDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  currentUserId,
  ...rest
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  const data = React.useMemo(() => {
    return users.all.filter(d => !currentUserId?.includes(d.id));
  }, [users.all, currentUserId]);

  React.useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const props = {
    ...rest,
    dataItemKey: 'id',
    name: name || 'userId',
    label: label || 'User:',
    data,
    textField: userTextFields.FULLNAME,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(UsersDropdown);
