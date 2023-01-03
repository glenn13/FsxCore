import React from 'react';
import {Route, Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {flowRight as compose} from 'lodash';

interface Props extends RouteComponentProps<any> {
  component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  isAuth: boolean;
  notAuthRedirectTo: string;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  isAuth,
  notAuthRedirectTo,
  ...rest
}: Props) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? <Component {...props} /> : <Redirect to={notAuthRedirectTo} {...props} />
    }
  />
);

export default compose(withRouter)(PrivateRoute);
