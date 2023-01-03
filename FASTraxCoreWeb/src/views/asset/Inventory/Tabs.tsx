import React from 'react';
import {TabStrip, TabStripTab} from '@progress/kendo-react-layout';
import VehiclesTab from './Vehicles';
import ComponentsTab from './Components';
import GeneralAssetsTab from './GeneralAssets';

export interface InventoryTabsProps {}

const InventoryTabs: React.FC<InventoryTabsProps> = () => {
  const [selected, setSelected] = React.useState(0);

  return (
    <TabStrip className="flex flex-1" selected={selected} onSelect={e => setSelected(e.selected)}>
      <TabStripTab title="General Assets">
        <GeneralAssetsTab />
      </TabStripTab>
      <TabStripTab title="Vehicles">
        <VehiclesTab />
      </TabStripTab>
      <TabStripTab title="Components">
        <ComponentsTab />
      </TabStripTab>
    </TabStrip>
  );
};

export default InventoryTabs;
