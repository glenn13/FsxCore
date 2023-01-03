import React, {Suspense} from 'react';
import {Loader} from '../../components/common';

const Disposition = React.lazy(() => import('@app/views/asset/Disposition'));

export interface DispositionRouteProps {}

const DispositionRoute: React.FC<DispositionRouteProps> = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="h-full">
        <Disposition />
      </div>
    </Suspense>
  );
};

export default DispositionRoute;
