import React, {Suspense} from 'react';
import {Loader} from '../../components/common';

const AssetManagement = React.lazy(() => import('../../views/asset'));

export interface AssetRouteProps {}

const AssetRoute: React.FC<AssetRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="h-full">
          <AssetManagement />
        </div>
      </Suspense>
    </>
  );
};

export default AssetRoute;
