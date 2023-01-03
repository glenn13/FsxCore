import React, {Suspense} from 'react';
import {Loader} from '../../components/common';

const AccountVerification = React.lazy(() => import('../../views/account/AccountVerification'));

export interface AssetRouteProps {}

const AccountVerificationRoute: React.FC<AssetRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="h-full">
          <AccountVerification />
        </div>
      </Suspense>
    </>
  );
};

export default AccountVerificationRoute;
