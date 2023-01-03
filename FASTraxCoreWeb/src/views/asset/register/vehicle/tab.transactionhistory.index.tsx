import React from 'react';
import Heading from '@app/views/common/Heading';
import FuelMonitoring from './tab.transactionhistory.fuelmonitoring';
import Engine from './tab.transactionhistory.engine';
import Odometer from './tab.transactionhistory.odometer';
import TransactionDetail from './tab.transactionhistory.transactiondetail';

export interface TransactionHistoryProps {
  isReadOnly: boolean;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({isReadOnly}) => {
  return (
    <div className="w-full p-4 mb-8">     

      <Heading title="Fuel Monitoring" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <FuelMonitoring isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>

      <div className="w-full mb-5" />
      <Heading title="Engine" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <Engine isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>

      <div className="w-full mb-5" />
      <Heading title="Odometer" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <Odometer isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>
       
      <div className="w-full mb-5" />
      <Heading title="Transactions" />
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-full">
          <div className="col-span-6">
            <TransactionDetail isReadOnly={isReadOnly}/>
          </div>
        </div>
      </div>
      
    </div>

  );
};

export default React.memo(TransactionHistory);
