import React, {Suspense} from 'react';
import {Loader} from '@app/components/common';
const UserSetting = React.lazy(() => import('../../../views/settings/users'));

export interface IUserManagementRouteProps {}

const UserManagementRoute: React.FC<IUserManagementRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <UserSetting />
      </Suspense>
    </>
  );
};

export default UserManagementRoute;
