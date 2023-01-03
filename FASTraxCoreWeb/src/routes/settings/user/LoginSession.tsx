import {Loader} from '@app/components/common';
import React from 'react';
import {StoreDispatch} from '@app/store/rootReducer';
import {useRouteMatch} from 'react-router-dom';
import {useDispatch} from 'react-redux';

const UserLoginSession = React.lazy(() => import('@app/views/settings/users/LoginSessions'));

export interface ViewProfileRouteProps {}

interface RouteProps {
  id: string;
}

const LoginSessionRoute: React.FC<ViewProfileRouteProps> = () => {
  const dispatch: StoreDispatch = useDispatch();
  const route = useRouteMatch<RouteProps>();

  return (
    <div className="flex flex-col h-full">
      <React.Suspense fallback={<Loader />}>
        <UserLoginSession />
      </React.Suspense>
    </div>
  );
};

export default LoginSessionRoute;
