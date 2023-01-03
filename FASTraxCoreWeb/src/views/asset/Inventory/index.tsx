import React from 'react';

import InventoryTabs from './Tabs';
import InventorySearch from './Search';
import {FsxInput} from '../../../components/common';
import {InputChangeEvent} from '@progress/kendo-react-inputs/dist/npm/input/interfaces/InputChangeEvent';
import GridToolbar, {ViewOptionTypes} from '@app/components/common/GridToolbar';
import GridToolbarItem from '@app/components/common/GridToolbar/GridToolbarItem';
import GridToolbarCounter, {counterColors} from '@app/components/common/GridToolbarCounter';
import {debounce} from '@app/helpers/input';

export interface InventoryProps {}

const Inventory: React.FC<InventoryProps> = () => {
  const WAIT_TIME = 2000;
  const [query, setQuery] = React.useState('');
  const [viewOption, setViewOption] = React.useState<keyof ViewOptionTypes>();
  const handleChange = (e: InputChangeEvent) => setQuery(e.target.value?.toString().trim() || '');

  return (
    <div className="flex flex-1 flex-col mb-4 h-full">
      <GridToolbar
        options={['Search', 'Summary']}
        defaultView="Search"
        onViewOptionsChange={e => setViewOption(e.value)}>
        <GridToolbarItem.Left>
          {viewOption === 'Search' && (
            <FsxInput
              name="search"
              label="Search"
              placeholder="Search here..."
              style={{width: '240px'}}
              onChange={debounce((e: InputChangeEvent) => handleChange(e), WAIT_TIME)}
            />
          )}
        </GridToolbarItem.Left>
        <GridToolbarItem.Right>
          <GridToolbarCounter
            className="mr-4"
            title="Asset Availability Count"
            color={counterColors.portage}
          />
          <GridToolbarCounter
            className="mr-4"
            title="Asset for Inspection"
            color={counterColors.glacier}
          />
          <GridToolbarCounter
            className="mr-4"
            title="Asset Due for Service"
            color={counterColors.pictonBlue}
          />
          <GridToolbarCounter
            className="mr-4"
            title="Asset Under Maintenance"
            color={counterColors.chardonnay}
          />
          <GridToolbarCounter
            className="mr-4"
            title="Asset for Collection"
            color={counterColors.portage}
          />
        </GridToolbarItem.Right>
      </GridToolbar>
      {viewOption && (
        <>{viewOption === 'Search' ? <InventorySearch query={query} /> : <InventoryTabs />}</>
      )}
    </div>
  );
};

export default Inventory;
