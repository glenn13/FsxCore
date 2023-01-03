import React from 'react';
import DocumentsArea from './Tab.AttachmentCustomField.Documents';
import Heading from '@app/views/common/Heading';

export interface AttachmentCustomFieldProps {}

const AttachmentCustomField: React.FC<AttachmentCustomFieldProps> = () => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Document Attachment" />
      <DocumentsArea />
    </div>
  );
};

export default React.memo(AttachmentCustomField);
