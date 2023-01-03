import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {RootState} from '@app/store/rootReducer';
import {PageActions} from '@app/store/settings/pages/types';

export const usePermissions = <T = unknown>() => {
  const pullPermissions = useSelector(
    (state: RootState) => state.pagePermissionActionReducer,
    shallowEqual,
  );

  const [actionPermissions, setActionPermissions] = React.useState<PageActions[]>([]);

  React.useEffect(() => {
    if (!pullPermissions.all || pullPermissions.all.length === 0) return;

    setActionPermissions(pullPermissions.all);
  }, [pullPermissions]);

  const hasPermission = React.useCallback(
    (key: string | undefined) => {
      return actionPermissions.some((item: PageActions) => item.name.toLowerCase() === key?.toLowerCase() && item.isEnable);
    },
    [actionPermissions],
  );

  return React.useMemo(() => {
    return {hasPermission};
  }, [hasPermission]);
};

export default usePermissions;
