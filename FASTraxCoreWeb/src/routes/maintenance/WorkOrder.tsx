import React, {Suspense} from 'react';
import {Loader} from '@app/components/common';
const MaintenanceWorkOrder = React.lazy(() => import('@app/views/maintenance/WorkOrder'));

export interface MaintenanceWorkOrderRouteProps {}

const MaintenanceWorkOrderRoute: React.FC<MaintenanceWorkOrderRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <MaintenanceWorkOrder />
      </Suspense>
    </>
  );
};

export default MaintenanceWorkOrderRoute;
