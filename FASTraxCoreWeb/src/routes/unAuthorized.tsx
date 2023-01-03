import React from 'react';
import Unauthorized from '../views/unauthorized';

export interface UnauthorizedRouteProps {}

const UnauthorizedRoute: React.FC<UnauthorizedRouteProps> = () => {
  return <Unauthorized />;
};

export default UnauthorizedRoute;
