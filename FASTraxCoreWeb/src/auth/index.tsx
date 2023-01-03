import React from 'react';
import {flowRight as compose} from 'lodash';
import {connect, ConnectedProps} from 'react-redux';
import {withRouter, RouteComponentProps, Route} from 'react-router-dom';
import {RootState} from '../store/rootReducer';

enum userRoles {
  superAdmin = 'Super Administrator',
  admin = 'Administrator',
  users = 'Standard User',
}

export const UserRoles = {
  admins: [String(userRoles.superAdmin), String(userRoles.admin)],
  users: [String(userRoles.users)],
  superAdmin: [String(userRoles.superAdmin)],
  admin: [String(userRoles.admin)],
  all: Object.values(userRoles),
};

interface IUser {
  permissions: string[];
  roles: string[];
}

const mapState = (state: RootState) => ({
  user: state.users.current,
  project: state.projects.current,
});

const connector = connect(mapState);

type ReduxProps = ConnectedProps<typeof connector>;

interface IAuthRouteProps extends RouteComponentProps<any>, ReduxProps {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  roles: string[];
}

export const hasPermission = (user: IUser, permissions: string | string[]) =>
  user.permissions.some(permission =>
    typeof permissions === 'string' ? permission === permissions : permissions.includes(permission),
  );

const AuthRoute: React.FC<IAuthRouteProps> = ({Component, path, roles, user, project, ...rest}) => {
  if (!user || !user.userProjects || !project) return null;

  const userProject = user.userProjects.find(up => up.projectId === project.id);

  if (!userProject?.userProjectRoles) return null;

  const userRoles = userProject.userProjectRoles.map(upr => upr.projectRole?.title);

  if (!userRoles.some(userRole => userRole && roles.includes(userRole))) return null;

  return <Route {...rest} component={Component} />;
};

export default compose(withRouter, connector)(AuthRoute);
