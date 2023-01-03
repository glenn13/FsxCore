/** Asset Module **/
import assetUOM from './components/Assets/AssetUOM';
import assetCategory from './components/Assets/AssetCategory';
import assetColor from './components/Assets/AssetColor';
import assetType from './components/Assets/AssetType';
import assetManufacturer from './components/Assets/AssetManufacturer';
import assetModel from './components/Assets/AssetModel';
import assetOwnership from './components/Assets/AssetOwnership';
import assetGroup from './components/Assets/AssetGroup';
import assetMeterType from './components/Assets/AssetMeterType';
import fuelType from './components/Assets/FuelType';
import transmissionType from './components/Assets/TransmissionType';
import engineType from './components/Assets/EngineType';
import customField from './components/Assets/CustomField'
/** Asset Disposition **/
import dispositionDamagedArea from './components/Assets/DispositionDamagedArea';
import dispositionRequiredRepair from './components/Assets/DispositionRequiredRepair';

/** Maintenance Management Module **/
import priorityLevel from './components/Maintenance/PriorityLevel';
import repairStatus from './components/Maintenance/RepairStatus';
import failureCause from './components/Maintenance/FailureCause';
import maintenanceDepartment from './components/Maintenance/MaintenanceDepartment';
import repairCategory from './components/Maintenance/RepairCategory';
import estimationType from './components/Maintenance/EstimationType';
import typeOfFault from './components/Maintenance/TypeOfFault';
import repairGroup from './components/Maintenance/RepairGroup';
import repairLevel from './components/Maintenance/RepairLevel';
import repairAction from './components/Maintenance/RepairAction';
import repairSubGroup from './components/Maintenance/RepairSubGroup';
import repairType from './components/Maintenance/RepairType';
import repairOperation from './components/Maintenance/RepairOperation';
import serviceType from './components/Maintenance/ServiceType';
import serviceGroup from './components/Maintenance/ServiceGroup';
import maintenanceSchedule from './components/Maintenance/MaintenanceSchedule';
import repairOperationActionVehicle from './components/Maintenance/RepairOperationActionVehicle';
import repairOperationActionComponent from './components/Maintenance/RepairOperationActionComponent';
import repairOperationActionGeneralAsset from './components/Maintenance/RepairOperationActionGeneralAsset';
 
/** Finance Module **/
import currency from './components/Finance/Currency';
import costCenter from './components/Finance/CostCenter';
import paymentType from './components/Finance/PaymentType';
import financeAccountType from './components/Finance/FinanceAccountType';
import financeAccountGroup from './components/Finance/FinanceAccountGroup';

/** Humar Resource Module **/
import department from './components/Hr/Department';
import personnelPosition from './components/Hr/PersonnelPosition';
import skillLevel from './components/Hr/SkillLevel';
import humanResourceCategory from './components/Hr/Category';
import humanResourceStatus from './components/Hr/Status';
import jobCode from './components/Hr/JobCode';
import personnelGroup from './components/Hr/PersonnelGroup';
import nationality from './components/Hr/Nationality';

/** CRM **/
import contractType from './components/CRM/ContractType';
import customerTier from './components/CRM/CustomerTier';
import customerGroup from './components/CRM/CustomerGroup';
import customerPersonnelPosition from './components/CRM/CustomerPersonnelPosition';
import customerType from './components/CRM/CustomerType';
import creditTerm from './components/CRM/CreditTerm';

/** STOCK **/
import stockCategory from './components/Stock/StockCategory';
import stockDepartment from './components/Stock/StockDepartment';
import stockVersion from './components/Stock/StockVersion';
import stockSeries from './components/Stock/StockSeries';
import unitType from './components/Stock/UnitType';
import stockLocation from './components/Stock/StockLocation';
import stockLocationShelf from './components/Stock/StockLocationShelf';
import stockCondition from './components/Stock/StockCondition';
import stockConditionStatusCode from './components/Stock/StockConditionStatusCode';
import stockConditionDispositionCode from './components/Stock/StockConditionDispositionCode';
import commodityBrand from './components/Stock/CommodityBrand';
import commodityDepartment from './components/Stock/CommodityDepartment';
import commodityGroup from './components/Stock/CommodityGroup';
import commodityModel from './components/Stock/CommodityModel';
import commoditySize from './components/Stock/CommoditySize';
import commodityItemNameGroup from './components/Stock/CommodityItemNameGroup';
import commodityItemName from './components/Stock/CommodityItemName';

export const Assets = {
  assetUOM,
  assetCategory,
  assetColor,
  assetType,
  assetManufacturer,
  assetModel,
  assetOwnership,
  assetGroup,
  assetMeterType,
  fuelType,
  transmissionType,
  engineType,
  customField,
  dispositionDamagedArea,
  dispositionRequiredRepair
};

export const Maintenance = {
  priorityLevel,
  repairGroup,
  repairCategory,
  repairStatus,
  repairAction,
  repairLevel,
  repairSubGroup,
  repairType,
  repairOperation,
  failureCause,
  maintenanceDepartment,
  estimationType,
  typeOfFault,
  serviceType,
  serviceGroup,
  maintenanceSchedule,
  repairOperationActionVehicle,
  repairOperationActionComponent,
  repairOperationActionGeneralAsset,
};

export const Finance = {
  currency,
  costCenter,
  paymentType,
  financeAccountType,
  financeAccountGroup,
};

export const HumanResource = {
  department,
  personnelPosition,
  skillLevel,
  humanResourceCategory, 
  humanResourceStatus, 
  jobCode,
  personnelGroup,
  nationality,
}

export const CRM = {
  contractType,
  customerTier,
  customerGroup,
  customerPersonnelPosition,
  customerType,
  creditTerm,
}

export const Stock = {
  stockCategory,
  stockDepartment,
  stockVersion,
  stockSeries,
  unitType,
  stockLocation,
  stockLocationShelf,
  stockCondition,
  stockConditionStatusCode,
  stockConditionDispositionCode,
  commodityBrand,
  commodityDepartment,
  commodityGroup,
  commodityModel,
  commoditySize,
  commodityItemNameGroup,
  commodityItemName
}