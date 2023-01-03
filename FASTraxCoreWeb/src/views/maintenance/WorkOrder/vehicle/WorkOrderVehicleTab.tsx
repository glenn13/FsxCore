import React from 'react';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import AttachmentCustomField from './Tab.AttachmentCustomField.index';
import ImagesApproval from './Tab.ImagesApproval.index';
import RequiredMaterial from './Tab.RequiredMaterial.index';
import ServiceRepair from './Tab.RequiredServiceRepair.index';

export interface WorkOrderVehicleTabProps {}

const WorkOrderVehicleTab: React.FC<WorkOrderVehicleTabProps> = () => {
    const [selected, setSelected] = React.useState(0);

    return (
        <TabStrip className="flex flex-1 mb-4" selected={selected} onSelect={e => setSelected(e.selected)}>
            <TabStripTab title="Selection">
               
            </TabStripTab>
            <TabStripTab title="Required Service & Repair">
                <ServiceRepair />
            </TabStripTab>
            <TabStripTab title="Required Material">
                <RequiredMaterial />
            </TabStripTab>
            <TabStripTab title="Image & Approval">
                <ImagesApproval />
            </TabStripTab>
            <TabStripTab title="Attachment & Custom Field">
                <AttachmentCustomField />
            </TabStripTab>
        </TabStrip>
    );
};

export default React.memo(WorkOrderVehicleTab);