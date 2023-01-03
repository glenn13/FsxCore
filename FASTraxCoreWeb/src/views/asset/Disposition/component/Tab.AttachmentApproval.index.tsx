import React from 'react';
import ImageAttachment from './Tab.Images';
import DocumentAttachment from './Tab.Documents';
import Approval from './Tab.Approvals';
import Heading from '@app/views/common/Heading';

export interface AttachmentApprovalProps {
  isReadOnly: boolean
}

const AttachmentApproval: React.FC<AttachmentApprovalProps> = ({isReadOnly}) => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Image Attachment" />
      <ImageAttachment isReadOnly={isReadOnly}/>
      <Heading title="Document Attachment" />
      <DocumentAttachment isReadOnly={isReadOnly}/>
      <Heading title="Approvals" />
      <Approval isReadOnly={isReadOnly}/>
    </div>
  );
};

export default React.memo(AttachmentApproval);
