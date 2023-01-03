import React from 'react';
import UnderConstruction from '@app/components/layout/UnderConstruction';

export interface AssetIssuanceProps {}

const AssetIssuance: React.FC<AssetIssuanceProps> = () => {
  return <UnderConstruction underConstruction />;
};

export default React.memo(AssetIssuance);
