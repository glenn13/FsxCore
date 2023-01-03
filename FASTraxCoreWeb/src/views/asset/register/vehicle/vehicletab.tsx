import React from 'react';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import Specification from './tab.specification.index';
import Registration from './tab.registration.index';
import TransactionHistory from './tab.transactionhistory.index';
import CustomFieldAttachment from './tab.customfieldattachment.index';

export interface VehicleTabProps {
    isEdit: boolean;
    isReadOnly: boolean;
}

const VehicleTab: React.FC<VehicleTabProps> = ({isEdit, isReadOnly}) => {
    const [selected, setSelected] = React.useState(0);

    return (
        <TabStrip className="flex flex-1 mb-4" selected={selected} onSelect={e => setSelected(e.selected)}>
           <TabStripTab title="Specification" >
                <Specification isEdit={isEdit} isReadOnly={isReadOnly}/>
             </TabStripTab>

            <TabStripTab title="Registration" >
                <Registration isReadOnly={isReadOnly}/>
            </TabStripTab>

            {(isEdit || isReadOnly) && (
            <TabStripTab title="Transaction History">
                <TransactionHistory isReadOnly={isReadOnly}/>
            </TabStripTab>
            )}

        
              {/* *****
                * Commented this part temporarily since there's no transaction yet
                {isEdit && (
                <TabStripTab title="Tracking">
                    Tracking
                </TabStripTab>
                )}
            * ****/}
            
            <TabStripTab title="Custom Field & Attachment">
                <CustomFieldAttachment isReadOnly={isReadOnly}/>
            </TabStripTab>

        </TabStrip>
    );
};

export default React.memo(VehicleTab);