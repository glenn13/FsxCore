import {Loader} from '@app/components/common';
import React from 'react';
import {StoreDispatch} from '@app/store/rootReducer';
import {User} from '@app/entities/catalog';
import {loadUser} from '@app/store/catalog/users/user.actions';
import {useRouteMatch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

const UserViewProfile = React.lazy(() => import('@app/views/settings/users/User.ViewProfile'));

export interface ViewProfileRouteProps {}

interface RouteProps {
  id: string;
}

const ViewProfileRoute: React.FC<ViewProfileRouteProps> = () => {
  const currentUser = useSelector((state: RootState) => state.users.current);
  const [user, setUser] = React.useState<User>();
  const dispatch: StoreDispatch = useDispatch();
  const route = useRouteMatch<RouteProps>();
  const id = currentUser?.id || 0; //route.params.id;

  React.useEffect(() => {
    dispatch(loadUser(id)).then(user => setUser(user));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col h-full">
      <React.Suspense fallback={<Loader />}>
        {user && <UserViewProfile data={user} />}
      </React.Suspense>
    </div>
  );
};

export default ViewProfileRoute;
