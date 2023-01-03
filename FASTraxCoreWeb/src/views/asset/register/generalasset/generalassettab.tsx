import React from 'react';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import Selection from './tab.selection.index';
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
           
           {(isEdit || isReadOnly) && (
            <TabStripTab title="Selection" >
                <Selection isReadOnly={isReadOnly} />
             </TabStripTab>
            )}
           
            <TabStripTab title="Registration" >
                <Registration isReadOnly={isReadOnly} />
            </TabStripTab>


            {/* *****
            * Commented this part temporarily since there's no transaction yet
            {isEdit && (
            <TabStripTab title="Pending Issuance">
                Pending Issuance
            </TabStripTab>
            )}

             * ****/}
           
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