import React from 'react';
import Heading from '@app/views/common/Heading';
import LinkedAsset from './tab.selection.linkedasset';

export interface SelectionProps {
  isReadOnly: boolean;
}

const Selection: React.FC<SelectionProps> = ({isReadOnly}) => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Linked Asset" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <LinkedAsset isReadOnly={isReadOnly} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Selection);
