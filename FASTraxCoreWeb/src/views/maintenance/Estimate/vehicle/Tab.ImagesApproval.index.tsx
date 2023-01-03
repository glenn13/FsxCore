import React from 'react';
import Heading from '@app/views/common/Heading';
import ImagesArea from './Tab.ImagesApproval.Images';

export interface ImagesApprovalProps {}

const ImagesApproval: React.FC<ImagesApprovalProps> = () => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Image Attachment" />
      <ImagesArea />
    </div>
  );
};

export default React.memo(ImagesApproval);
