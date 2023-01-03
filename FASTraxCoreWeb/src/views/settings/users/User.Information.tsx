import React from 'react';
import {useFormikContext} from 'formik';
import {Prompt} from 'react-router-dom';
import ProjectLocation from './Details/Project.Location';
import UserCredential from './Details/User.Credential';

import FsxPanelBar from '@app/components/common/FsxPanelBar';
import FsxPanelBarItem from '@app/components/common/FsxPanelBar/FsxPanelBarItem';
export interface UserInformationProps {
  id?: number | string;
}

const UserInformation: React.FC<UserInformationProps> = ({id, children}) => {
  const formik = useFormikContext();

  return (
    <div className="flex flex-col bg-gray-100">
      <Prompt
        when={formik.dirty && !formik.status}
        message={() => 'You have some unsaved changes that may get lost, do you want to proceed?'}
      />
      {children}

      <FsxPanelBar>
        <FsxPanelBarItem title="User Credentials" expanded={true}>
          <UserCredential />
        </FsxPanelBarItem>

        <FsxPanelBarItem title="Project Site Access" expanded={true}>
          <ProjectLocation />
        </FsxPanelBarItem>
      </FsxPanelBar>
    </div>
  );
};

export default UserInformation;
