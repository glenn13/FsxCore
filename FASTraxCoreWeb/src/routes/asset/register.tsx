import React, {Suspense} from 'react';
import {Loader} from '../../components/common';

const AssetRegister = React.lazy(() => import('@app/views/asset/register'));

export interface AssetRegisterRouteProps {}

const AssetRegisterRoute: React.FC<AssetRegisterRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="h-full">
          <AssetRegister />
        </div>
      </Suspense>
    </>
  );
};

export default AssetRegisterRoute;
