import React from 'react';
import Heading from '@app/views/common/Heading';
import Material from './Tab.RequiredMaterial.Material';

export interface RequiredMaterialProps {}

const RequiredMaterial: React.FC<RequiredMaterialProps> = () => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Required Material" />
      <Material />
    </div>
  );
};

export default React.memo(RequiredMaterial);
