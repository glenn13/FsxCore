import * as yup from 'yup';
import {assetShape, newAsset} from './Asset';
import {EngineHistory} from './EngineHistory';
import {FuelMonitoring} from './FuelMonitoring';
import {OdometerHistory} from './OdometerHistory';
import VehicleLinkedAsset from './VehicleLinkedAsset';
import {AssetLocation} from '../standard-entries/AssetLocation';
import VehicleArmourDetail from './VehicleArmourDetail';
import {Asset} from '@app/entities/asset/inventory/Asset';
import VehicleWarrantyDetail from './VehicleWarrantyDetail';
import VehicleAttachmentImage from './VehicleAttachmentImage';
import VehicleAttachmentDocument from './VehicleAttachmentDocument';
import VehicleRegistrationDetail from './VehicleRegistrationDetail';
import {VehicleDepreciationDetail} from './VehicleDepreciationDetail';
import {
  VehicleSecondaryDetail,
  newVehicleSecondaryDetail,
  vehicleSecondaryDetailShape,
} from './VehicleSecondaryDetail';

import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export const newVehicle = (): Vehicle => ({
    ...newAsset(),
  assetCategoryId: AssetCategoryEnum.Vehicle,
  pickupDate: new Date(),
  tireRear: '',
  tireFront: '',
  doorCount: 0,
  maxCapacity: 0,
  assetLocationId: 0,
  vehicleSecondaryDetailId: 0,

  vehicleSecondaryDetail: newVehicleSecondaryDetail(),
});

export interface Vehicle extends Asset {
  assetCategoryId: number;
  pickupDate: Date;
  tireRear: string;
  tireFront: string;
  doorCount: number;
  maxCapacity: number;
  assetLocationId: number;
  vehicleSecondaryDetailId: number;

  assetLocation?: AssetLocation;
  vehicleSecondaryDetail?: VehicleSecondaryDetail;

  engineHistories?: EngineHistory[];
  fuelMonitorings?: FuelMonitoring[];
  odometerHistories?: OdometerHistory[];

  vehicleArmourDetails?: VehicleArmourDetail[];
  vehicleLinkedAssets?: VehicleLinkedAsset[];
  vehicleLinkedGeneralAssets?: VehicleLinkedAsset[];
  vehicleWarrantyDetails?: VehicleWarrantyDetail[];
  vehicleAttachmentImages?: VehicleAttachmentImage[];
  vehicleAttachmentDocuments?: VehicleAttachmentDocument[];
  vehicleRegistrationDetails?: VehicleRegistrationDetail[];
  vehicleDepreciationDetails?: VehicleDepreciationDetail[];
  vehiclePurchase?: VehiclePurchase[];
}

export const vehicleShape = {
  ...assetShape,
  pickupDate: yup.date(),
  locationId: yup.number().min(1, 'Location is required!').required(),
  tireRear: yup.string().min(1, 'Location is required!').required(),
  tireFront: yup.string().min(1, 'Location is required!').required(),
  doorCount: yup.number().min(2, 'Minimum Door Count is 2!').required(),
  maxCapacity: yup.number().required(),

  vehicleSecondaryDetail: yup.object().shape(vehicleSecondaryDetailShape),
};
