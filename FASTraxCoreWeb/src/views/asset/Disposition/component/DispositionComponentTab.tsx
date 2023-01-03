import React from 'react';
import {TabStrip, TabStripTab} from '@progress/kendo-react-layout';
import AttachmentApproval from './Tab.AttachmentApproval.index';
import DispositionDetail from './Tab.Details.index';

export interface DispositionComponentTabProps {
  isReadOnly: boolean
}

const DispositionComponentTab: React.FC<DispositionComponentTabProps> = ({isReadOnly}) => {
  const [selected, setSelected] = React.useState(0);

  return (
    <TabStrip
      className="flex flex-1 mb-4"
      selected={selected}
      onSelect={e => setSelected(e.selected)}>
      <TabStripTab title="Details">
        <DispositionDetail isReadOnly={isReadOnly}/>
      </TabStripTab>
      <TabStripTab title="Attachment & Approval">
        <AttachmentApproval isReadOnly={isReadOnly}/>
      </TabStripTab>
    </TabStrip>
  );
};

export default React.memo(DispositionComponentTab);
