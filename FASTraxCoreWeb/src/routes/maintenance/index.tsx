import React, {Suspense} from 'react';
import {Loader} from '@app/components/common';
const MaintenanceManagement = React.lazy(() => import('@app/views/maintenance'));

export interface MaintenanceRouteProps {}

const MaintenanceRoute: React.FC<MaintenanceRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <MaintenanceManagement />
      </Suspense>
    </>
  );
};

export default MaintenanceRoute;
