import React, {Suspense} from 'react';
import {Loader} from '../components/common';
const Dashboard = React.lazy(() => import('../views/dashboard'));

export interface DashboardRouteProps {}

export interface KGridProps {
  result: any;
  dataState: any;
}

const DashboardRoute: React.FC<DashboardRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    </>
  );
};

export default DashboardRoute;
