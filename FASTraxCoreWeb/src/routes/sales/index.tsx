import React, {Suspense} from 'react';
import {Loader} from '../../components/common';
const SalesMain = React.lazy(() => import('../../views/sales'));

export interface SalesRouteProps {}

const SalesRoute: React.FC<SalesRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <SalesMain />
      </Suspense>
    </>
  );
};

export default SalesRoute;
