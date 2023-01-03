import React from 'react';
import UnderConstruction from '@app/components/layout/UnderConstruction';

export interface VehicleHistoryProps {}

const VehicleHistory: React.FC<VehicleHistoryProps> = () => {
  return <UnderConstruction underConstruction />;
};

export default React.memo(VehicleHistory);
