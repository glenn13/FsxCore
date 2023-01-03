import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import {FsxFormikDropDownListProps} from '@app/components/common/FsxFormik/FsxFormikDropDownList';
import React from 'react';
import {useProjectStatuses} from '@app/services/catalog/project.status.service';

export type ProjectStatusDropdownProps = FsxFormikDropDownListProps & {};

const ProjectStatusDropdown: React.FC<ProjectStatusDropdownProps> = ({...rest}) => {
  const {isLoading, projectStatuses} = useProjectStatuses();
  return (
    <FsxFormikDropDownList
      {...rest}
      loading={isLoading}
      dataItemKey="id"
      textField="title"
      data={projectStatuses}
    />
  );
};

export default React.memo(ProjectStatusDropdown);
