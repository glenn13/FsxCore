import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import {FsxFormikDropDownListProps} from '@app/components/common/FsxFormik/FsxFormikDropDownList';
import React from 'react';
import {useRoleByProjectById} from '@app/services/catalog/project.role.service';

export type ProjectRoleDropdownProps = FsxFormikDropDownListProps & {
  projectId: number | string;
};

const ProjectRoleDropdown: React.FC<ProjectRoleDropdownProps> = ({projectId, ...rest}) => {
  const {isLoading, projectRoles} = useRoleByProjectById(projectId);
  return (
    <FsxFormikDropDownList
      {...rest}
      loading={isLoading}
      dataItemKey="id"
      textField="title"
      data={projectRoles}
    />
  );
};

export default React.memo(ProjectRoleDropdown);
