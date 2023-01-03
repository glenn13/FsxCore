import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import {FsxFormikDropDownListProps} from '@app/components/common/FsxFormik/FsxFormikDropDownList';
import React from 'react';
import {useProjectGroups} from '@app/services/catalog/project.group.service';

export type ProjectGroupDropdownProps = FsxFormikDropDownListProps & {};

const ProjectGroupDropdown: React.FC<ProjectGroupDropdownProps> = ({...rest}) => {
  const {isLoading, projectGroups} = useProjectGroups();
  return (
    <FsxFormikDropDownList
      {...rest}
      loading={isLoading}
      dataItemKey="id"
      textField="title"
      data={projectGroups}
    />
  );
};

export default React.memo(ProjectGroupDropdown);
