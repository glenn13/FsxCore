import React, {Suspense} from 'react';
import {Loader} from '../../components/common';
const MaintenanceInspection = React.lazy(() => import('../../views/maintenance/Inspection'));

export interface MaintenanceInspectionRouteProps {}

const MaintenanceInspectionRoute: React.FC<MaintenanceInspectionRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <MaintenanceInspection />
      </Suspense>
    </>
  );
};

export default MaintenanceInspectionRoute;
