import {Asset, Maintenance, Setting, HumanResource} from './module.key';

enum BASE_ROUTE_KEY {
  NEW = 'add',
  VIEW = 'view',
  EDIT = 'Edit',
  DELETE = 'delete',
  PRINT = 'print',
  EXPORT = 'export',
  FLAG = 'flag'
}

/* -------------------------------------------------------------------------- */
/*                   Human Resource Personnel Keys                            */
/* -------------------------------------------------------------------------- */

export const HumanResourcePersonnel = {
  PersonnelNew: `${HumanResource.Personnel}.${String(BASE_ROUTE_KEY.NEW)}`,
  PersonnelEdit: `${HumanResource.Personnel}.${String(BASE_ROUTE_KEY.EDIT)}`,
}

/* -------------------------------------------------------------------------- */
/*                         Asset Register Keys                                */
/* -------------------------------------------------------------------------- */

export const AssetRegister = {
  GeneralAssetNew: `${Asset.Register.GeneralAsset}.${String(BASE_ROUTE_KEY.NEW)}`,
  GeneralAssetView: `${Asset.Register.GeneralAsset}.${String(BASE_ROUTE_KEY.VIEW)}`,
  GeneralAssetEdit: `${Asset.Register.GeneralAsset}.${String(BASE_ROUTE_KEY.EDIT)}`,
  GeneralAssetDelete: `${Asset.Register.GeneralAsset}.${String(BASE_ROUTE_KEY.DELETE)}`,
  GeneralAssetPrint: `${Asset.Register.GeneralAsset}.${String(BASE_ROUTE_KEY.PRINT)}`,
  GeneralAssetExport: `${Asset.Register.GeneralAsset}.${String(BASE_ROUTE_KEY.EXPORT)}`,
  GeneralAssetFlag: `${Asset.Register.GeneralAsset}.${String(BASE_ROUTE_KEY.FLAG)}`,
  
  ComponentNew: `${Asset.Register.Component}.${String(BASE_ROUTE_KEY.NEW)}`,
  ComponentView: `${Asset.Register.Component}.${String(BASE_ROUTE_KEY.VIEW)}`,
  ComponentEdit: `${Asset.Register.Component}.${String(BASE_ROUTE_KEY.EDIT)}`,
  ComponentDelete: `${Asset.Register.Component}.${String(BASE_ROUTE_KEY.DELETE)}`,
  ComponentPrint: `${Asset.Register.Component}.${String(BASE_ROUTE_KEY.PRINT)}`,
  ComponentExport: `${Asset.Register.Component}.${String(BASE_ROUTE_KEY.EXPORT)}`,
  ComponentFlag: `${Asset.Register.Component}.${String(BASE_ROUTE_KEY.FLAG)}`,

  VehicleNew: `${Asset.Register.Vehicle}.${String(BASE_ROUTE_KEY.NEW)}`,
  VehicleView: `${Asset.Register.Vehicle}.${String(BASE_ROUTE_KEY.VIEW)}`,
  VehicleEdit: `${Asset.Register.Vehicle}.${String(BASE_ROUTE_KEY.EDIT)}`,
  VehicleDelete: `${Asset.Register.Vehicle}.${String(BASE_ROUTE_KEY.DELETE)}`,
  VehiclePrint: `${Asset.Register.Vehicle}.${String(BASE_ROUTE_KEY.PRINT)}`,
  VehicleExport: `${Asset.Register.Vehicle}.${String(BASE_ROUTE_KEY.EXPORT)}`,
  VehicleFlag: `${Asset.Register.Vehicle}.${String(BASE_ROUTE_KEY.FLAG)}`,
};

export const AssetDisposition = {
  GeneralAssetNew: `${Asset.Disposition.GeneralAsset}.${String(BASE_ROUTE_KEY.NEW)}`,
  GeneralAssetView: `${Asset.Disposition.GeneralAsset}.${String(BASE_ROUTE_KEY.VIEW)}`,
  GeneralAssetEdit: `${Asset.Disposition.GeneralAsset}.${String(BASE_ROUTE_KEY.EDIT)}`,
  GeneralAssetDelete: `${Asset.Disposition.GeneralAsset}.${String(BASE_ROUTE_KEY.DELETE)}`,
  GeneralAssetPrint: `${Asset.Disposition.GeneralAsset}.${String(BASE_ROUTE_KEY.PRINT)}`,
  GeneralAssetExport: `${Asset.Disposition.GeneralAsset}.${String(BASE_ROUTE_KEY.EXPORT)}`,

  ComponentNew: `${Asset.Disposition.Component}.${String(BASE_ROUTE_KEY.NEW)}`,
  ComponentView: `${Asset.Disposition.Component}.${String(BASE_ROUTE_KEY.VIEW)}`,
  ComponentEdit: `${Asset.Disposition.Component}.${String(BASE_ROUTE_KEY.EDIT)}`,
  ComponentDelete: `${Asset.Disposition.Component}.${String(BASE_ROUTE_KEY.DELETE)}`,
  ComponentPrint: `${Asset.Disposition.Component}.${String(BASE_ROUTE_KEY.PRINT)}`,
  ComponentExport: `${Asset.Disposition.Component}.${String(BASE_ROUTE_KEY.EXPORT)}`,

  VehicleNew: `${Asset.Disposition.Vehicle}.${String(BASE_ROUTE_KEY.NEW)}`,
  VehicleView: `${Asset.Disposition.Vehicle}.${String(BASE_ROUTE_KEY.VIEW)}`,
  VehicleEdit: `${Asset.Disposition.Vehicle}.${String(BASE_ROUTE_KEY.EDIT)}`,
  VehicleDelete: `${Asset.Disposition.Vehicle}.${String(BASE_ROUTE_KEY.DELETE)}`,
  VehiclePrint: `${Asset.Disposition.Vehicle}.${String(BASE_ROUTE_KEY.PRINT)}`,
  VehicleExport: `${Asset.Disposition.Vehicle}.${String(BASE_ROUTE_KEY.EXPORT)}`,
};

/* -------------------------------------------------------------------------- */
/*                         Maintenance Action Keys                            */
/* -------------------------------------------------------------------------- */

export const MaintenanceInspection = {
  GeneralAssetNew: `${Maintenance.Inspection.GeneralAsset}.${String(BASE_ROUTE_KEY.NEW)}`,
  GeneralAssetView: `${Maintenance.Inspection.GeneralAsset}.${String(BASE_ROUTE_KEY.VIEW)}`,
  GeneralAssetEdit: `${Maintenance.Inspection.GeneralAsset}.${String(BASE_ROUTE_KEY.EDIT)}`,
  GeneralAssetDelete: `${Maintenance.Inspection.GeneralAsset}.${String(BASE_ROUTE_KEY.DELETE)}`,
  GeneralAssetPrint: `${Maintenance.Inspection.GeneralAsset}.${String(BASE_ROUTE_KEY.PRINT)}`,
  GeneralAssetExport: `${Maintenance.Inspection.GeneralAsset}.${String(BASE_ROUTE_KEY.EXPORT)}`,

  ComponentNew: `${Maintenance.Inspection.Component}.${String(BASE_ROUTE_KEY.NEW)}`,
  ComponentView: `${Maintenance.Inspection.Component}.${String(BASE_ROUTE_KEY.VIEW)}`,
  ComponentEdit: `${Maintenance.Inspection.Component}.${String(BASE_ROUTE_KEY.EDIT)}`,
  ComponentDelete: `${Maintenance.Inspection.Component}.${String(BASE_ROUTE_KEY.DELETE)}`,
  ComponentPrint: `${Maintenance.Inspection.Component}.${String(BASE_ROUTE_KEY.PRINT)}`,
  ComponentExport: `${Maintenance.Inspection.Component}.${String(BASE_ROUTE_KEY.EXPORT)}`,

  VehicleNew: `${Maintenance.Inspection.Vehicle}.${String(BASE_ROUTE_KEY.NEW)}`,
  VehicleView: `${Maintenance.Inspection.Vehicle}.${String(BASE_ROUTE_KEY.VIEW)}`,
  VehicleEdit: `${Maintenance.Inspection.Vehicle}.${String(BASE_ROUTE_KEY.EDIT)}`,
  VehicleDelete: `${Maintenance.Inspection.Vehicle}.${String(BASE_ROUTE_KEY.DELETE)}`,
  VehiclePrint: `${Maintenance.Inspection.Vehicle}.${String(BASE_ROUTE_KEY.PRINT)}`,
  VehicleExport: `${Maintenance.Inspection.Vehicle}.${String(BASE_ROUTE_KEY.EXPORT)}`,
};

export const MaintenanceEstimate = {
  GeneralAssetNew: `${Maintenance.Estimate.GeneralAsset}.${String(BASE_ROUTE_KEY.NEW)}`,
  GeneralAssetView: `${Maintenance.Estimate.GeneralAsset}.${String(BASE_ROUTE_KEY.VIEW)}`,
  GeneralAssetEdit: `${Maintenance.Estimate.GeneralAsset}.${String(BASE_ROUTE_KEY.EDIT)}`,
  GeneralAssetDelete: `${Maintenance.Estimate.GeneralAsset}.${String(BASE_ROUTE_KEY.DELETE)}`,
  GeneralAssetPrint: `${Maintenance.Estimate.GeneralAsset}.${String(BASE_ROUTE_KEY.PRINT)}`,
  GeneralAssetExport: `${Maintenance.Estimate.GeneralAsset}.${String(BASE_ROUTE_KEY.EXPORT)}`,

  ComponentNew: `${Maintenance.Estimate.Component}.${String(BASE_ROUTE_KEY.NEW)}`,
  ComponentView: `${Maintenance.Estimate.Component}.${String(BASE_ROUTE_KEY.VIEW)}`,
  ComponentEdit: `${Maintenance.Estimate.Component}.${String(BASE_ROUTE_KEY.EDIT)}`,
  ComponentDelete: `${Maintenance.Estimate.Component}.${String(BASE_ROUTE_KEY.DELETE)}`,
  ComponentPrint: `${Maintenance.Estimate.Component}.${String(BASE_ROUTE_KEY.PRINT)}`,
  ComponentExport: `${Maintenance.Estimate.Component}.${String(BASE_ROUTE_KEY.EXPORT)}`,

  VehicleNew: `${Maintenance.Estimate.Vehicle}.${String(BASE_ROUTE_KEY.NEW)}`,
  VehicleView: `${Maintenance.Estimate.Vehicle}.${String(BASE_ROUTE_KEY.VIEW)}`,
  VehicleEdit: `${Maintenance.Estimate.Vehicle}.${String(BASE_ROUTE_KEY.EDIT)}`,
  VehicleDelete: `${Maintenance.Estimate.Vehicle}.${String(BASE_ROUTE_KEY.DELETE)}`,
  VehiclePrint: `${Maintenance.Estimate.Vehicle}.${String(BASE_ROUTE_KEY.PRINT)}`,
  VehicleExport: `${Maintenance.Estimate.Vehicle}.${String(BASE_ROUTE_KEY.EXPORT)}`,
};

export const MaintenanceWorkOrder = {
  GeneralAssetNew: `${Maintenance.WorkOrder.GeneralAsset}.${String(BASE_ROUTE_KEY.NEW)}`,
  GeneralAssetView: `${Maintenance.WorkOrder.GeneralAsset}.${String(BASE_ROUTE_KEY.VIEW)}`,
  GeneralAssetEdit: `${Maintenance.WorkOrder.GeneralAsset}.${String(BASE_ROUTE_KEY.EDIT)}`,
  GeneralAssetDelete: `${Maintenance.WorkOrder.GeneralAsset}.${String(BASE_ROUTE_KEY.DELETE)}`,
  GeneralAssetPrint: `${Maintenance.WorkOrder.GeneralAsset}.${String(BASE_ROUTE_KEY.PRINT)}`,
  GeneralAssetExport: `${Maintenance.WorkOrder.GeneralAsset}.${String(BASE_ROUTE_KEY.EXPORT)}`,

  ComponentNew: `${Maintenance.WorkOrder.Component}.${String(BASE_ROUTE_KEY.NEW)}`,
  ComponentView: `${Maintenance.WorkOrder.Component}.${String(BASE_ROUTE_KEY.VIEW)}`,
  ComponentEdit: `${Maintenance.WorkOrder.Component}.${String(BASE_ROUTE_KEY.EDIT)}`,
  ComponentDelete: `${Maintenance.WorkOrder.Component}.${String(BASE_ROUTE_KEY.DELETE)}`,
  ComponentPrint: `${Maintenance.WorkOrder.Component}.${String(BASE_ROUTE_KEY.PRINT)}`,
  ComponentExport: `${Maintenance.WorkOrder.Component}.${String(BASE_ROUTE_KEY.EXPORT)}`,

  VehicleNew: `${Maintenance.WorkOrder.Vehicle}.${String(BASE_ROUTE_KEY.NEW)}`,
  VehicleView: `${Maintenance.WorkOrder.Vehicle}.${String(BASE_ROUTE_KEY.VIEW)}`,
  VehicleEdit: `${Maintenance.WorkOrder.Vehicle}.${String(BASE_ROUTE_KEY.EDIT)}`,
  VehicleDelete: `${Maintenance.WorkOrder.Vehicle}.${String(BASE_ROUTE_KEY.DELETE)}`,
  VehiclePrint: `${Maintenance.WorkOrder.Vehicle}.${String(BASE_ROUTE_KEY.PRINT)}`,
  VehicleExport: `${Maintenance.WorkOrder.Vehicle}.${String(BASE_ROUTE_KEY.EXPORT)}`,

  BOMNew: `${Maintenance.WorkOrder.BOM}.${String(BASE_ROUTE_KEY.NEW)}`,
  BOMView: `${Maintenance.WorkOrder.BOM}.${String(BASE_ROUTE_KEY.VIEW)}`,
  BOMEdit: `${Maintenance.WorkOrder.BOM}.${String(BASE_ROUTE_KEY.EDIT)}`,
  BOMDelete: `${Maintenance.WorkOrder.BOM}.${String(BASE_ROUTE_KEY.DELETE)}`,
  BOMPrint: `${Maintenance.WorkOrder.BOM}.${String(BASE_ROUTE_KEY.PRINT)}`,
  BOMExport: `${Maintenance.WorkOrder.BOM}.${String(BASE_ROUTE_KEY.EXPORT)}`,
};

export const MaintenanceTimesheet = {
  New: `${Maintenance.Timesheet.base}.${String(BASE_ROUTE_KEY.NEW)}`,
  View: `${Maintenance.Timesheet.base}.${String(BASE_ROUTE_KEY.VIEW)}`,
  Edit: `${Maintenance.Timesheet.base}.${String(BASE_ROUTE_KEY.EDIT)}`,
  Delete: `${Maintenance.Timesheet.base}.${String(BASE_ROUTE_KEY.DELETE)}`,
  Print: `${Maintenance.Timesheet.base}.${String(BASE_ROUTE_KEY.PRINT)}`,
  Export: `${Maintenance.Timesheet.base}.${String(BASE_ROUTE_KEY.EXPORT)}`,
};

export const SettingUserManagement = {
  New: `${Setting.User.Management.base}.${String(BASE_ROUTE_KEY.NEW)}`,
  View: `${Setting.User.Management.base}.${String(BASE_ROUTE_KEY.VIEW)}`,
  Edit: `${Setting.User.Management.base}.${String(BASE_ROUTE_KEY.EDIT)}`,
  Delete: `${Setting.User.Management.base}.${String(BASE_ROUTE_KEY.DELETE)}`,
  Print: `${Setting.User.Management.base}.${String(BASE_ROUTE_KEY.PRINT)}`,
  Export: `${Setting.User.Management.base}.${String(BASE_ROUTE_KEY.EXPORT)}`,
};

export const SettingProject = {
  New: `${Setting.Project.base}.${String(BASE_ROUTE_KEY.NEW)}`,
  View: `${Setting.Project.base}.${String(BASE_ROUTE_KEY.VIEW)}`,
  Edit: `${Setting.Project.base}.${String(BASE_ROUTE_KEY.EDIT)}`,
  Delete: `${Setting.Project.base}.${String(BASE_ROUTE_KEY.DELETE)}`,
  Print: `${Setting.Project.base}.${String(BASE_ROUTE_KEY.PRINT)}`,
  Export: `${Setting.Project.base}.${String(BASE_ROUTE_KEY.EXPORT)}`,
};

export const SettingRole = {
  New: `${Setting.Role.base}.${String(BASE_ROUTE_KEY.NEW)}`,
  View: `${Setting.Role.base}.${String(BASE_ROUTE_KEY.VIEW)}`,
  Edit: `${Setting.Role.base}.${String(BASE_ROUTE_KEY.EDIT)}`,
  Delete: `${Setting.Role.base}.${String(BASE_ROUTE_KEY.DELETE)}`,
  Print: `${Setting.Role.base}.${String(BASE_ROUTE_KEY.PRINT)}`,
  Export: `${Setting.Role.base}.${String(BASE_ROUTE_KEY.EXPORT)}`,
};
