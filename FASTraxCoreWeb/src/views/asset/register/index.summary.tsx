import { useRadialMenu } from '@app/hooks/useRadialMenu';
import { RadialItem } from '@app/store/app/types';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import React from 'react';
import ComponentTab from './tab.component';
import GeneralAssetTab from './tab.generalasset';
import VehicleTab from './tab.vehicle';

export interface AssetRegisterSummaryProps {}

const AssetRegisterSummary: React.FC<AssetRegisterSummaryProps> = () => {
    const [selected, setSelected] = React.useState(0);
    
    const radialMenu = useRadialMenu({rerenderDelayMS: 100});
    const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>([]);

    React.useEffect(() => {
        radialMenu.generate(radialMenuItems);
    }, [radialMenu, radialMenuItems]);

    return (
        <div className="flex flex-col h-full">
            <TabStrip className="flex flex-1 mb-4" selected={selected} onSelect={e => setSelected(e.selected)}>
                <TabStripTab title="GENERAL ASSET" >
                    <GeneralAssetTab radialItems={e => setRadialMenuItems(e)} />
                </TabStripTab>
                <TabStripTab title="VEHICLE">
                    <VehicleTab radialItems={e => setRadialMenuItems(e)} />
                </TabStripTab>
                <TabStripTab title="COMPONENT">
                    <ComponentTab radialItems={e => setRadialMenuItems(e)}  />
                </TabStripTab>
            </TabStrip>
        </div>
    );
};

export default AssetRegisterSummary;