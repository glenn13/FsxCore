import React, {Suspense} from 'react';
import {Loader} from '../components/common';
const Login = React.lazy(() => import('../views/account/login'));

export interface LoginRouteProps {}

const LoginRoute: React.FC<LoginRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    </>
  );
};

export default LoginRoute;
