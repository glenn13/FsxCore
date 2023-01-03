import React from 'react';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import Registration from './tab.registration.index';
import CustomFieldAttachment from './tab.customfieldattachment.index';
import TransactionHistory from './tab.transactionhistory.index';

export interface GeneralAssetTabProps {
    isEdit: boolean;
    isReadOnly: boolean;
}

const GeneralAssetTab: React.FC<GeneralAssetTabProps> = ({isEdit, isReadOnly}) => {
    const [selected, setSelected] = React.useState(0);

    return (
        <TabStrip className="flex flex-1 mb-4" selected={selected} onSelect={e => setSelected(e.selected)}>
        
           
            <TabStripTab title="Registration" >
                <Registration isReadOnly={isReadOnly} />
            </TabStripTab>

            {(isEdit || isReadOnly) && (
            <TabStripTab title="Transaction History">
                <TransactionHistory isReadOnly={isReadOnly} />
            </TabStripTab>
            )}

            <TabStripTab title="Custom Field & Attachment">
                <CustomFieldAttachment isReadOnly={isReadOnly} />
            </TabStripTab>
        </TabStrip>
    );
};

export default React.memo(GeneralAssetTab);