import * as yup from 'yup';

import {Project} from '../../catalog/Project';
import {generateUUID} from './../../../helpers/randoms';
import {EntityCustomField} from '../../global/EntityCustomField';
import {MaintenanceStatus} from '../standard-entries/MaintenanceStatus';
import {AssetOwnership, assetOwnershipShape, newAssetOwnership} from './AssetOwnership';

export const newAsset = (): Asset => ({
    id: 0,
    assetRefId: generateUUID(true).toUpperCase(),
    projectSiteId: 0,
    assetManufacturerId: 0,
    assetStatusId: 0,
    assetGroupId: 0,
    assetModelId: 0,
    maintenanceStatusId: 0,
    assetTypeId: 0,
    seriesId: 0,
    assetOwnershipTypeId: 0,
    assetModelYearId: 0,
    assetColorId: 0,
    assetOwnershipId: 0,
    lastServiceDate: new Date(),
    inventoryDate: new Date(),
    dateRegistered: new Date(),
    serialNo: '',
    title: '.',
    assetOwnership: newAssetOwnership(),
});

export interface Asset {
  id: number;
  projectSiteId: number;
  assetRefId: string;
  assetManufacturerId: number;
  assetStatusId: number;
  assetGroupId: number;
  assetTypeId: number;
  assetModelId: number;
  maintenanceStatusId: number;
  seriesId: number;
  assetOwnershipTypeId: number;
  assetModelYearId: number;
  assetColorId: number;
  lastServiceDate: Date;
  inventoryDate: Date;
  dateRegistered: Date;
  serialNo: string;
  title: string;
  description?: string;
  assetOwnershipId: number;

  base64stringImage?: string;
  uri?: string;

  projectSite?: Project;
  assetCategory?: AssetCategory;
  assetManufacturer?: AssetManufacturer;
  assetStatus?: AssetStatus;
  assetGroup?: AssetGroup;
  assetModel?: AssetModel;
  maintenanceStatus?: MaintenanceStatus;
  assetType?: AssetType;
  series?: AssetSeries;
  assetOwnershipType?: AssetOwnershipType;
  assetModelYear?: AssetModelYear;
  assetColor?: AssetColor;
  assetOwnership: AssetOwnership;

  assetCustomFields?: EntityCustomField[];
}

export const assetShape = {
  assetRefId: yup.string().required(),
  assetManufacturerId: yup.number().min(1, 'Manufacturer is required!').required(),
  assetStatusId: yup.number().min(1, 'Asset Status is required!').required(),
  assetGroupId: yup.number().min(1, 'Asset Group is required!').required(),
  assetTypeId: yup.number().min(1, 'Asset Type is required!').required(),
  assetModelId: yup.number().min(1, 'Model is required!').required(),
  maintenanceStatusId: yup.number().min(1, 'Maintenance Status is required!').required(),
  seriesId: yup.number().min(1, 'Series is required!').required(),
  assetOwnershipTypeId: yup.number().min(1, 'Ownership Type is required!').required(),
  assetModelYearId: yup.number().min(1, 'Model Year is required!').required(),
  assetColorId: yup.number().min(1, 'Color is required!').required(),
  lastServiceDate: yup.date(),
  inventoryDate: yup.date().required(),
  dateRegistered: yup.date().required(),
  serialNo: yup.string().required('Serial No. is required!'),
  title: yup.string().required(),
  description: yup.string().nullable(),
  assetOwnership: yup.object().shape(assetOwnershipShape),
};
