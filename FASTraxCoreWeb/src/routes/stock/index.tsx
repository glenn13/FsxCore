import React, {Suspense} from 'react';
import {Loader} from '../../components/common';

const StockMain = React.lazy(() => import('../../views/stock'));

export interface StockRouteProps {}

const StockRoute: React.FC<StockRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <StockMain />
      </Suspense>
    </>
  );
};

export default StockRoute;
