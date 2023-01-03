import React from 'react';
import Heading from '@app/views/common/Heading';
import ArmourDetail from './tab.specification.armourdetail';
import LinkedAsset from './tab.specification.linkedasset';
import SecondaryDetail from './tab.specification.secondarydetail';

export interface SpecificationProps {
  isEdit: boolean;
  isReadOnly: boolean;
}

const Specification: React.FC<SpecificationProps> = ({isEdit, isReadOnly}) => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Secondary Detail" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <SecondaryDetail isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>

      <Heading title="Armour Detail" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <ArmourDetail isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>

      <div className="w-full mb-5" />
      {(isEdit || isReadOnly) && <Heading title="Linked Asset" />}
      {(isEdit || isReadOnly) && (
        <div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
            <div className="col-span-6">
              <LinkedAsset isReadOnly={isReadOnly}/>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default React.memo(Specification);
