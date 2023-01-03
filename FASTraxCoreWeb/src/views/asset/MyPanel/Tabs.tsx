import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {TabStrip, TabStripTab} from '@progress/kendo-react-layout';
import TabForDisposal from './Tab.ForDisposal';
import TabAlerts from './Tab.Alerts';
import TabUnderMaintenance from './Tab.UnderMaintenance';
import UnderConstruction from '@app/components/layout/UnderConstruction';

export interface AssetManagementTabsProps {}

const useStyle = makeStyles({
  flex: {
    flex: 1,
    display: 'flex',
  },
});

const AssetManagementTabs: React.FC<AssetManagementTabsProps> = () => {
  const classes = useStyle();
  const [selected, setSelected] = React.useState(0);

  return (
    <TabStrip
      className={`${classes.flex} h-full`}
      selected={selected}
      onSelect={e => setSelected(e.selected)}>
      <TabStripTab title="Alerts">
        <TabAlerts />
      </TabStripTab>
      <TabStripTab title="Errors">
        <UnderConstruction underConstruction />
      </TabStripTab>
      <TabStripTab title="Under Maintenance">
        <TabUnderMaintenance />
      </TabStripTab>
      <TabStripTab title="Awaiting Parts / Maintenance">
        <UnderConstruction underConstruction />
      </TabStripTab>
      <TabStripTab title="For Disposal">
        <TabForDisposal />
      </TabStripTab>
    </TabStrip>
  );
};

export default AssetManagementTabs;
