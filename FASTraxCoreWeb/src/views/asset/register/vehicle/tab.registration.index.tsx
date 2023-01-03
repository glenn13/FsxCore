import React from 'react';
import Heading from '@app/views/common/Heading';
import Ownership from './tab.registration.ownership';
import Purchase from './tab.registration.purchase';
import Depreciation from './tab.registration.depreciation';
import WarrantyDetail from './tab.registration.warrantydetail';
import RegistrationDetail from './tab.registration.detail';

export interface RegistrationProps {
  isReadOnly: boolean;
}

const Registration: React.FC<RegistrationProps> = ({isReadOnly}) => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Asset Purchase, Ownership and Depreciation Methods" />
      <div className="m-2">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-4 min-h-full">
          {/**Start - Left group of fields**/}
          <div className="col-span-3">
            <div className="flex flex-col h-full">
              <div className="grid sm:grod-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2">
                <Ownership isReadOnly={isReadOnly}/>
                <Purchase isReadOnly={isReadOnly}/>
              </div>
            </div>
          </div>
          {/**End - Left group of fields**/}

          {/**Start - Right group of fields **/}
          <div className="col-span-5">
            <Depreciation isReadOnly={isReadOnly}/>
          </div>
          {/**End - Right group of fields **/}
        </div>
      </div>

      <div className="w-full mb-8" />
      <Heading title="Warranty Details" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <WarrantyDetail isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>

      <div className="w-full mb-5" />
      <Heading title="Registration Details" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <RegistrationDetail isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>

    </div>
  );
};

export default React.memo(Registration);
