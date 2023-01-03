import React from 'react';
import CustomFieldsForm from './Form';
import Heading from '@app/views/common/Heading';
import ImagesAttachmentsGrid from './ImageAttachments';
import DocumentAttachmentsGrid from './DocumentAttahcments';

export interface CustomFieldsProps {}

const CustomFields: React.FC<CustomFieldsProps> = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full flex flex-col">
        <Heading title="Image Attachments" />
        <ImagesAttachmentsGrid />
      </div>
      <div className="w-full flex flex-col">
        <Heading title="Document Attachments" />
        <DocumentAttachmentsGrid />
      </div>
      <div className="w-full flex flex-col">
        <Heading title="Custom Fields" />
        <CustomFieldsForm />
      </div>
    </div>
  );
};

export default React.memo(CustomFields);
