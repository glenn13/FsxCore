import React from 'react';
import {useFormikContext} from 'formik';
import {Prompt} from 'react-router-dom';
import ProjectRole from './Details/Project.Roles';
import ProjectSites from './Details/Project.Sites';
import FsxPanelBar from '@app/components/common/FsxPanelBar';
import FsxPanelBarItem from '@app/components/common/FsxPanelBar/FsxPanelBarItem';

export interface ProjectInformationProps {
  id?: number | string;
  children: React.ReactNode | React.ReactNode[];
}

const ProjectInformation: React.FC<ProjectInformationProps> = ({id, children}) => {
  const formik = useFormikContext();

  return (
    <div className="flex flex-col bg-gray-100">
      <Prompt
        when={formik.dirty && !formik.status}
        message={() => 'You have some unsaved changes that may get lost, do you want to proceed?'}
      />
      {children}

      <FsxPanelBar>
        <FsxPanelBarItem title="Project Roles" expanded={true}>
          <ProjectRole />
        </FsxPanelBarItem>

        <FsxPanelBarItem title="Project Sites" expanded={true}>
          <ProjectSites />
        </FsxPanelBarItem>
      </FsxPanelBar>
    </div>
  );
};

export default React.memo(ProjectInformation);
