import React, {Suspense} from 'react';
import {Loader} from '../../components/common';
const AssetHireMain = React.lazy(() => import('../../views/hire'));

export interface AssetHireRouteProps {}

const AssetHireRoute: React.FC<AssetHireRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <AssetHireMain />
      </Suspense>
    </>
  );
};

export default AssetHireRoute;
