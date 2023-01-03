import React, {Suspense} from 'react';
import {Loader} from '../../../components/common';
const Reports = React.lazy(() => import('../../../views/reports'));

export interface ReportRouteProps {}

const ReportRoute: React.FC<ReportRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        {/* <Reports reportBy="module" /> */}
        {/* <Reports reportBy="subModule" showByModuleName="Asset" /> */}
      </Suspense>
    </>
  );
};

export default ReportRoute;
