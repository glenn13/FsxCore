import React, {useEffect} from 'react';

import ProjectGrid from './Project.Grid';
import {RadialItem} from '@app/store/app/types';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';

export interface IProjectsProps {}

const Projects: React.FC<IProjectsProps> = () => {
  const history = useHistory();

  const [selected, setSelected] = React.useState();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});

  const handleNew = () => history.push(`/app/setting/project/new`);

  const handleUpdate = React.useCallback(
    () => selected && history.push(`/app/setting/project/${selected}`),
    [selected, history],
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
    <div className="flex flex-1 flex-col">
      <ProjectGrid
        onRowClick={e => setSelected(e.dataItem['id'])}
        onRowDoubleClick={e => handleUpdate()}
      />
    </div>
  );
};

export default Projects;
