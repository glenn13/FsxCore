import React, {Suspense} from 'react';
import {Loader} from '../../components/common';
const Inventory = React.lazy(() => import('../../views/asset/Inventory'));

export interface InventoryRouteProps {}

const InventoryRoute: React.FC<InventoryRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Inventory />
      </Suspense>
    </>
  );
};

export default InventoryRoute;
