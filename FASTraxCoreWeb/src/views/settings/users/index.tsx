import React, {useEffect} from 'react';
import {TabStrip, TabStripTab} from '@progress/kendo-react-layout';

import {RadialItem} from '@app/store/app/types';
import UserGrid from './UserGrid';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';

export interface IUserSettingProps {}

const UserSetting: React.FC<IUserSettingProps> = () => {
  const history = useHistory();
  const [selected, setSelected] = React.useState(0);
  const [selectedGridRow, setSelectedGridRow] = React.useState();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});

  const handleNew = () => history.push(`/app/setting/user/management/new`);

  const handleUpdate = React.useCallback(
    () => selectedGridRow && history.push(`/app/setting/user/management/${selectedGridRow}`),
    [selectedGridRow, history],
  );

  const radialItems = React.useMemo(
    (): RadialItem[] => [
      {title: 'Add New', icon: 'add', onClick: handleNew},
      {title: 'Edit', icon: 'edit', onClick: handleUpdate},
      {title: 'Print', icon: 'print'},
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleUpdate],
  );

  useEffect(() => {
    radialMenu.generate(radialItems);
  }, [radialMenu, radialItems]);

  return (
    <div className="flex flex-1 flex-col h-full">
      <TabStrip
        className="flex flex-1 mb-4"
        selected={selected}
        onSelect={e => setSelected(e.selected)}>
        <TabStripTab title="User">
          <UserGrid
            onRowClick={e => setSelectedGridRow(e.dataItem['id'])}
            onRowDoubleClick={e => handleUpdate()}
          />
        </TabStripTab>
      </TabStrip>
    </div>
  );
};

export default UserSetting;
