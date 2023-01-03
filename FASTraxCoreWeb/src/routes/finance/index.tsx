import React, {Suspense} from 'react';
import {Loader} from '../../components/common';
const FinanceMain = React.lazy(() => import('../../views/finance'));

export interface FinanceRouteProps {}

const FinanceRoute: React.FC<FinanceRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <FinanceMain />
      </Suspense>
    </>
  );
};

export default FinanceRoute;
