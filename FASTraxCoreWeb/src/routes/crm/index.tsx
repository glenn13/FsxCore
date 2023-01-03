import React, {Suspense} from 'react';
import {Loader} from '../../components/common';
const Customer = React.lazy(() => import('../../views/crm'));

export interface CustomerRouteProps {}

const CustomerRoute: React.FC<CustomerRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Customer />
      </Suspense>
    </>
  );
};

export default CustomerRoute;
