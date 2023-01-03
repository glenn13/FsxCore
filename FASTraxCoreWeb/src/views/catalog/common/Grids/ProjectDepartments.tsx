import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/rootReducer';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type ProjectDepartmentsDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const ProjectDepartmentsDropdown: React.FC<ProjectDepartmentsDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const projectDepartments = useSelector(
    (state: RootState) => state.projects.current?.projectDepartments,
  );
  return (
    <FsxDropdown
      {...rest}
      dataItemKey="id"
      textField="title"
      label="Project Department:"
      data={projectDepartments || []}
    />
  );
};

export default React.memo(ProjectDepartmentsDropdown);
