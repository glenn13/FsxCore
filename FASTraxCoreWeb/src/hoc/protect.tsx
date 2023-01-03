import React, { ComponentType } from 'react';
import { hasPermission } from '../auth';

export interface IAuthPermissionProps {
     permission: string | string[];
}

export function withAuth<Props>(
     Component: ComponentType<Props>
): ComponentType<Props & IAuthPermissionProps> {
     const currentUser = JSON.parse(
          localStorage.getItem('CURRENT_USER') || '{}'
     );

     return (props) => {
          const { permission, ...rest } = props;
          const isAllowed = hasPermission(currentUser, permission);

          return <Component {...props} disabled={!isAllowed} />;
     };
}
