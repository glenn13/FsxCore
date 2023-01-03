import React, {Suspense} from 'react';
import {Loader} from '../../components/common';
const MaintenanceEstimate = React.lazy(() => import('../../views/maintenance/Estimate'));

export interface MaintenanceEstimateRouteProps {}

const MaintenanceEstimateRoute: React.FC<MaintenanceEstimateRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <MaintenanceEstimate />
      </Suspense>
    </>
  );
};

export default MaintenanceEstimateRoute;
