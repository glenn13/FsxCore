import React from 'react';
import Heading from '@app/views/common/Heading';
import Justification from './Tab.Justification';
import DamagedAreas from './Tab.DamagedAreas';
import RequiredRepairs from './Tab.RequiredRepairs';

export interface DispositionDetaisProps {
  isReadOnly: boolean;
}

const DispositionDetail: React.FC<DispositionDetaisProps> = ({isReadOnly}) => {
  return (
    <div className="w-full p-4 mb-8">
      <Heading title="Justification" />
      <Justification isReadOnly={isReadOnly}/>
      <Heading title="Damaged Area(s)" />
      <DamagedAreas isReadOnly={isReadOnly}/>
      <Heading title="Required Repair(s)" />
      <RequiredRepairs isReadOnly={isReadOnly}/>
    </div>
  );
};

export default React.memo(DispositionDetail);
