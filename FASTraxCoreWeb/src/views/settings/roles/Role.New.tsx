import React from 'react';
import {initialProject} from '@app/store/catalog/projects/project.reducer';
import RoleDetail from './Details';

const RoleNew: React.FC<{}> = () => {
  return <RoleDetail initialValues={initialProject} />;
};

export default RoleNew;
