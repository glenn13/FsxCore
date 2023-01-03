import React from 'react';
import {useRole} from '@app/services/catalog/role.service';
import RoleDetail from './Details';
import {useParams} from 'react-router-dom';

const RoleEdit: React.FC<{}> = () => {
  const params = useParams<{id: string}>();
  const {isLoading, data} = useRole(parseInt(params.id));

  return <>{!isLoading && <RoleDetail initialValues={data?.data} isEdit={true} />}</>;
};

export default RoleEdit;
