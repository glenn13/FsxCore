import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/store/rootReducer';
import {Asset} from '@app/entities/asset/inventory/Asset';
import LinkedAssets, {BaseLinkedAssetsProps} from './LinkedAssets';
import EntityLinkedAsset from '@app/entities/asset/inventory/EntityLinkedAsset';
import {setLinkedAssets} from '@app/store/asset/inventory/linkedAssets.reducers';

export interface LinkedAssetsStoreProps extends BaseLinkedAssetsProps {}

const LinkedAssetsStore: React.FC<LinkedAssetsStoreProps> = ({referenceId, categoryId}) => {
  const dispatch = useDispatch();
  const linkedAssets = useSelector(
    (state: RootState) => state.linkedAssets,
  ) as EntityLinkedAsset<Asset>[];

  const handleSubmit = (linkedAsset: EntityLinkedAsset<Asset>) => {
    dispatch(setLinkedAssets([...linkedAssets, linkedAsset]));

    return true;
  };

  const handleDelete = (linkedAsset: EntityLinkedAsset<Asset>) => {
    dispatch(setLinkedAssets(linkedAssets.filter(la => la.id !== linkedAsset.id)));

    return true;
  };

  return (
    <LinkedAssets
      categoryId={categoryId}
      referenceId={referenceId}
      linkedAssets={linkedAssets}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
};

export default React.memo(LinkedAssetsStore);
