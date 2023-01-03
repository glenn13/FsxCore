import * as React from 'react';
import {TabStrip, TabStripTab} from '@progress/kendo-react-layout';
import DispositionGeneralAssets from './DispositionGeneralAssets';
import DispositionVehicles from './DispositionVehicles';
import DispositionComponents from './DispositionComponents';
import {useLocation} from 'react-router-dom';

export interface DispositionTabsProps {}

const DispositionTabs: React.FC<DispositionTabsProps> = () => {
  const [selected, setSelected] = React.useState(0);
  const [tabIndex, setTabIndex] = React.useState(0);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const queryParam = useQuery();
  const tab = queryParam.get('tabIndex');

  React.useEffect(() => {
    if (tab !== null) {
      setSelected(parseInt(tab));
    }
  }, []);

  const handleSelected = (e: any) => {
    setSelected(e);
  };

  return (
    <div className="flex flex-col h-full">
      <TabStrip
        className="flex flex-1 mb-4"
        selected={selected}
        onSelect={e => handleSelected(e.selected)}>
        <TabStripTab title="General Assets">
          <DispositionGeneralAssets />
        </TabStripTab>
        <TabStripTab title="VEHICLE">
          <DispositionVehicles />
        </TabStripTab>
        <TabStripTab title="COMPONENT">
          <DispositionComponents />
        </TabStripTab>
      </TabStrip>
    </div>
  );
};

export default DispositionTabs;
