import React from 'react';
import ArmourDetails from './ArmourDetails';
import Heading from '@app/views/common/Heading';
import SecondaryDetails from './SecondaryDetails';
import LinkedAssetsStore from './LinkedAssetsStore';
import LinkedAssetsContext from './LinkedAssetContext';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export interface AssetSpecificationProps {
    categoryId: AssetCategoryEnum;
  referenceId?: number;
  isEdit?: boolean;
}

const AssetSpecification: React.FC<AssetSpecificationProps> = ({
  isEdit,
  categoryId,
  referenceId,
}) => {
    const isVehicle = categoryId === AssetCategoryEnum.Vehicle;

  return (
    <div className="flex flex-col">
      {isVehicle && (
        <div className="w-full">
          <Heading title="Secondary Details" />
          <SecondaryDetails />
        </div>
      )}
      {isVehicle && (
        <div className="w-full my-6">
          <Heading title="Armour Details" />
          <ArmourDetails />
        </div>
      )}
      {isEdit && referenceId && (
        <div className="w-full my-6">
          <Heading title="Linked Vehicles" />
          <LinkedAssetsStore categoryId={categoryId} referenceId={referenceId} />
        </div>
      )}

      {isEdit && referenceId && isVehicle && (
        <div className="w-full my-6">
                  <Heading title="Linked General Assets" />
                  <LinkedAssetsContext categoryId={AssetCategoryEnum.GeneralAsset} referenceId={referenceId} />
        </div>
      )}
    </div>
  );
};

export default React.memo(AssetSpecification);
