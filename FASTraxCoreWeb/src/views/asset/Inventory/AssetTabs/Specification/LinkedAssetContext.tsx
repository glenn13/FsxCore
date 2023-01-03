import React from 'react';
import {Asset} from '@app/entities/asset/inventory/Asset';
// import {LinkedAssetsContext} from '@app/routes/asset/editvehicle';
import LinkedAssets, {BaseLinkedAssetsProps} from './LinkedAssets';
import EntityLinkedAsset from '@app/entities/asset/inventory/EntityLinkedAsset';

export interface LinkedAssetContextProps extends BaseLinkedAssetsProps {}

const LinkedAssetsContextComponent: React.FC<LinkedAssetContextProps> = ({
  categoryId,
  referenceId,
}) => {
  
  return (
   <></>
  );
};

export default LinkedAssetsContextComponent;
