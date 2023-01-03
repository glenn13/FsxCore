import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import RolesGrid from './Role.Grid';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {RadialItem} from '@app/store/app/types';

export interface IRolesProps {}

const Roles: React.FC<IRolesProps> = () => {
  const history = useHistory();

  const [selected, setSelected] = React.useState();
  //   const radialMenu = useRadialMenu({rerenderDelayMS: 100});

  const handleUpdate = React.useCallback(
    () => selected && history.push(`/app/setting/role/${selected}`),
    [selected, history],
  );

  //   const radialItems = React.useMemo(
  //     (): RadialItem[] => [
  //       {title: 'Export', icon: 'excel'},
  //       {title: 'Print', icon: 'print'},
  //       {title: 'Update', icon: 'edit', onClick: handleUpdate},
  //     ],
  //     [handleUpdate],
  //   );

  //   useEffect(() => {
  //     radialMenu.generate(radialItems);
  //   }, [radialMenu, radialItems]);

  return (
    <div className="flex flex-1 flex-col">
      <RolesGrid
        onRowClick={e => setSelected(e.dataItem['id'])}
        onRowDoubleClick={e => handleUpdate()}
      />
    </div>
  );
};

export default Roles;
