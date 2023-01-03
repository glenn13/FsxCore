import React from 'react';
import Heading from '@app/views/common/Heading';
import ImageAttachment from './tab.customfieldattachment.image';
import CustomField from './tab.customfieldattachment.customfield';
import DocumentAttachment from './tab.customfieldattachment.document';

export interface CustomFieldAttachmentProps {
  isReadOnly: boolean;
}

const CustomFieldAttachment: React.FC<CustomFieldAttachmentProps> = ({isReadOnly}) => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Image Attachment" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <ImageAttachment isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>

      <Heading title="Document Attachment" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <DocumentAttachment isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>

      <Heading title="Custom Field" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <CustomField isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default React.memo(CustomFieldAttachment);
