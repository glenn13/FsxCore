import {
  Asset,
  CRM,
  Dashboard,
  Finance,
  HumanResource,
  Maintenance,
  Sales,
  Setting,
  Stock,
  Report,
} from '@app/helpers/permissions/module.key';
import {
  AssetDisposition,
  AssetRegister,
  MaintenanceEstimate,
  MaintenanceInspection,
  MaintenanceTimesheet,
  MaintenanceWorkOrder,
  SettingProject,
  SettingRole,
  SettingUserManagement,
  HumanResourcePersonnel
} from '@app/helpers/permissions/action.key';
import {TimeSheet, TimeSheetEdit, TimeSheetNew} from './maintenance/TimeSheetLazyLoaded';

import AssetHireRoute from './hire';
import AssetRegisterRoute from './asset/register';
import AssetRoute from './asset';
import CustomerRoute from './crm';
import DashboardRoute from '../routes/dashboard';
import EditComponentRoute from './asset/EditComponent';
import EditEstimateComponentRoute from './maintenance/EditEstimateComponent';
import EditEstimateGeneralAssetRoute from './maintenance/EditEstimateGeneralAsset';
import EditEstimateVehicleRoute from './maintenance/EditEstimateVehicle';
import EditGeneralAssetRoute from './asset/editgeneralasset';
import EditUserRoute from './settings/user/EditUser';
import ReportsView from '@app/views/reports';
import ChangeUserPasswordRoute from './settings/user/ChangePassword';
import ViewProfile from './settings/user/ViewProfile';
import LoginSession from './settings/user/LoginSession';
import EditVehicleRoute from './asset/EditVehicle';
import EditWorkOrderBOMRoute from './maintenance/EditWorkOrderBOM';
import EditWorkOrderComponentRoute from './maintenance/EditWorkOrderComponent';
import EditWorkOrderGeneralAssetRoute from './maintenance/EditWorkOrderGeneralAsset';
import EditWorkOrderVehicleRoute from './maintenance/EditWorkOrderVehicle';
import FinanceRoute from './finance';
import HumanResourcesRoute from './hr';
import PersonnelRoute from './hr/Personnel';

import NewPersonnelRoute from './hr/Personnel/NewPersonnel';
import EditPersonnelRoute from './hr/Personnel/EditPersonnel';
import PersonnelEdit from '@app/views/hr/Personnel/personnelEdit';
import PersonnelNew from '@app/views/hr/Personnel/personnelNew';
import InspectionComponentEdit from '@app/views/maintenance/Inspection/Component/InspectionComponentEdit';
import InspectionComponentNew from '@app/views/maintenance/Inspection/Component/InspectionComponentNew';
import InspectionGeneralAssetEdit from '@app/views/maintenance/Inspection/GeneralAsset/InspectionGeneralAssetEdit';
import InspectionGeneralAssetNew from '@app/views/maintenance/Inspection/GeneralAsset/InspectionGeneralAssetNew';
import InspectionVehicleEdit from '@app/views/maintenance/Inspection/Vehicle/InspectionVehicleEdit';
import InspectionVehicleNew from '../views/maintenance/Inspection/Vehicle/InspectionVehicleNew';
import MaintenanceEstimateRoute from './maintenance/Estimate';
import MaintenanceInspectionRoute from './maintenance/Inspection';
import MaintenanceRoute from './maintenance';
import MaintenanceWorkOrderRoute from './maintenance/WorkOrder';
import NewComponentRoute from './asset/NewComponent';
import NewEstimateComponentRoute from './maintenance/NewEstimateComponent';
import NewEstimateGeneralAssetRoute from './maintenance/NewEstimateGeneralAsset';
import NewEstimateVehicleRoute from './maintenance/NewEstimateVehicle';
import NewGeneralAssetRoute from './asset/newgeneralasset';
import NewUserRoute from './settings/user/NewUser';
import NewVehicleRoute from './asset/newvehicle';
import NewWorkOrderBOMRoute from './maintenance/NewWorkOrderBOM';
import NewWorkOrderComponentRoute from './maintenance/NewWorkOrderComponent';
import NewWorkOrderGeneralAssetRoute from './maintenance/NewWorkOrderGeneralAsset';
import NewWorkOrderVehicleRoute from './maintenance/NewWorkOrderVehicle';
import PrivateRoute from '../auth/PrivateRoute';
import ProjectEdit from './settings/projects/EditProject';
import ProjectNew from './settings/projects/NewProject';
import Projects from '@app/views/settings/projects';
import ProjectsRoute from './projects';
import React from 'react';
import RoleEdit from '@app/views/settings/roles/Role.Edit';
import RoleNew from '@app/views/settings/roles/Role.New';
import Roles from '@app/views/settings/roles';
import {Route} from 'react-router-dom';
import SalesRoute from './sales';
import StandardEntries from '@app/views/settings/standard-entries';
import StockRoute from './stock';
import UserManagementRoute from './settings/user';

import DispositionRoute from './asset/Disposition';
import NewDispositionGeneralAssetRoute from './asset/NewDispositionGeneralAsset';
import NewDispositionVehicleRoute from './asset/NewDispositionVehicle';
import NewDispositionComponentRoute from './asset/NewDispositionComponent';
import EditDispositionGeneralAssetRoute from './asset/EditDispositionGeneralAsset';
import EditDispositionVehicleRoute from './asset/EditDispositionVehicle';
import EditDispositionComponentRoute from './asset/EditDispositionComponent';
import ViewGeneralAssetRoute from './asset/viewgeneralasset';
import ViewComponentRoute from './asset/viewcomponent';
import ViewVehicleRoute from './asset/viewvehicle';

import ReportPerItem from './settings/reports/ReportPerItem';

export interface ILayoutPartProps {
  header?: boolean;
  banner?: boolean;
  bannerControl?: boolean;
  aside?: boolean;
  footer?: boolean;
}

export interface IContainerProps {
  boxed?: boolean;
  full?: boolean;
}

export interface IMetaProps {
  title: string;
  description?: string;
  layoutPart: ILayoutPartProps;
  container?: IContainerProps;
}

export interface IRoutePageProps {
  id?: number;
  parentId?: number;
  uri: string;
  name: string;
  component?: React.FC;
  auth?: boolean;
  isExact?: boolean;
  layout: string;
  icon?: string;
  meta?: IMetaProps;
  showOnSidebar?: boolean;
  isEnable?: boolean;
  hasChild?: boolean;
  global?: boolean;
}

interface LayoutSection {
  sidebar: boolean;
  header: boolean;
  footer: boolean;
}

/**
 *
 * @param routes route list for dynamic routes
 * @param layout reference Layout page to use
 */
export const getDynamicRoutes = (
  routes: IRoutePageProps[],
  layout: string,
  isAuthenticated: boolean,
  notAuthRedirectTo: string,
) => {
  return routes.map((prop, key) => {
    if (prop.layout === layout) {
      const isDefault = prop.layout === '/default';
      const currentLayout = !isDefault ? prop.layout : '';

      if (prop.auth)
        return (
          <PrivateRoute
            key={key}
            exact={prop.isExact}
            path={currentLayout + prop.uri}
            component={prop.component}
            isAuth={isAuthenticated || prop.global}
            notAuthRedirectTo={notAuthRedirectTo}
            // roles={UserRoles.all}
          />
        );
      else
        return (
          <Route
            path={currentLayout + prop.uri}
            exact={prop.isExact}
            component={prop.component}
            key={key}
          />
        );
    } else return null;
  });
};

const appLayoutPart: ILayoutPartProps = {
  header: true,
  banner: true,
  bannerControl: true,
  aside: true,
  footer: true,
};

const adminLayoutPart: ILayoutPartProps = {
  header: true,
  aside: true,
  footer: true,
};

export const Routes: IRoutePageProps[] = [
  {
    name: Dashboard.base,
    uri: '/dashboard',
    icon: 'dashboard',
    auth: true,
    component: DashboardRoute,
    layout: '/app',
    meta: {
      title: 'Dashboard',
      description: 'Shows graphical representation of records',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: CRM.base,
    uri: '/customer',
    icon: 'users',
    auth: true,
    component: CustomerRoute,
    layout: '/app',
    meta: {
      title: 'CRM',
      description: 'Customer Relation Management',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Asset.base,
    uri: '/asset',
    icon: 'asset',
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Asset',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Setting.base,
    uri: '/setting',
    icon: 'asset',
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Setting',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Asset.Register.GeneralAsset,
    uri: '/asset/register/generalasset',
    icon: 'asset',
    isExact: true,
    showOnSidebar: false,
    isEnable: false,
    layout: '/app',
    meta: {
      title: 'General Asset',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Setting.User.base,
    uri: '/setting/user',
    icon: 'user',
    isExact: true,
    layout: '/app',
    meta: {
      title: 'User',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Asset.MyPanel.base,
    uri: '/asset/mypanel',
    icon: 'my-panel',
    component: AssetRoute,
    layout: '/app',
    meta: {
      title: 'My Panel',
      description: 'Display statistical representation of company asset',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Asset.Register.base,
    uri: `/asset/register`,
    icon: 'truck',
    auth: true,
    isExact: true,
    component: AssetRegisterRoute,
    layout: '/app',
    meta: {
      title: 'Register',
      description: 'Display lists of company asset',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.GeneralAssetNew,
    uri: '/asset/register/generalasset/new',
    auth: true,
    component: NewGeneralAssetRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'General Asset - New',
      description: 'Monitor and manage your assets using a systemized approach',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.GeneralAssetEdit,
    uri: '/asset/register/generalasset/:id',
    auth: true,
    component: EditGeneralAssetRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'General Asset - Edit',
      description: 'Monitor and manage your assets using a systemized approach',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.GeneralAssetView,
    uri: '/asset/register/generalasset/:id/view',
    auth: true,
    component: ViewGeneralAssetRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'General Asset - View',
      description: 'Monitor and manage your assets using a systemized approach',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.VehicleNew,
    uri: '/asset/register/vehicle/new',
    auth: true,
    component: NewVehicleRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Vehicle - New',
      description: 'Monitor and manage your assets using a systemized approach',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: 'asset.register.generalasset.report',
    uri: '/asset/register/generalasset/:id/report',
    auth: true,
    component: ReportPerItem,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'General Asset - Report',
      description: 'Report for selected General Asset per item',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: 'asset.register.vehicle.report',
    uri: '/asset/register/vehicle/:id/report',
    auth: true,
    component: ReportPerItem,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'General Asset - Report',
      description: 'Report for selected Vehicle per item',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: 'asset.register.component.report',
    uri: '/asset/register/component/:id/report',
    auth: true,
    component: ReportPerItem,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Component - Report',
      description: 'Report for selected Component per item',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.VehicleEdit,
    uri: '/asset/register/vehicle/:id',
    auth: true,
    component: EditVehicleRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Vehicle - Edit',
      description: 'Monitor and manage your assets using a systemized approach',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.VehicleView,
    uri: '/asset/register/vehicle/:id/view',
    auth: true,
    component: ViewVehicleRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Vehicle - View',
      description: 'Monitor and manage your assets using a systemized approach',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.ComponentNew,
    uri: '/asset/register/component/new',
    auth: true,
    component: NewComponentRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Component - New',
      description: 'Monitor and manage your assets using a systemized approach',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.ComponentEdit,
    uri: '/asset/register/component/:id',
    auth: true,
    component: EditComponentRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Component - Edit',
      description: 'Monitor and manage your assets using a systemized approach',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.ComponentView,
    uri: '/asset/register/component/:id/view',
    auth: true,
    component: ViewComponentRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Component - View',
      description: 'Monitor and manage your assets using a systemized approach',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetDisposition.GeneralAssetNew,
    uri: '/asset/disposition/generalasset/:id/new',
    component: NewDispositionGeneralAssetRoute,
    layout: '/app',
    meta: {
      title: 'General Asset - New Disposition',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetDisposition.VehicleNew,
    uri: '/asset/disposition/vehicle/:id/new',
    icon: 'truck',
    auth: true,
    isExact: true,
    component: NewDispositionVehicleRoute,
    layout: '/app',
    meta: {
      title: 'Vehicle - New Disposition',
      description: '',
      layoutPart: appLayoutPart,
    },
    showOnSidebar: true,
  },
  {
    name: AssetDisposition.ComponentNew,
    uri: '/asset/disposition/component/:id/new',
    isExact: true,
    global: true,
    component: NewDispositionComponentRoute,
    layout: '/app',
    meta: {
      title: 'Component - New Disposition',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetDisposition.GeneralAssetEdit,
    uri: '/asset/disposition/generalasset/:id',
    component: EditDispositionGeneralAssetRoute,
    layout: '/app',
    meta: {
      title: 'General Asset - Edit Disposition',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetDisposition.VehicleEdit,
    uri: '/asset/disposition/vehicle/:id',
    component: EditDispositionVehicleRoute,
    layout: '/app',
    meta: {
      title: 'Vehicle - Edit Disposition',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetDisposition.ComponentEdit,
    uri: '/asset/disposition/component/:id',
    component: EditDispositionComponentRoute,
    layout: '/app',
    meta: {
      title: 'Component - Edit Disposition',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: AssetRegister.ComponentNew,
    uri: '/asset/inventory/components/new',
    component: NewComponentRoute,
    meta: {
      title: 'Component - New',
      description: 'create new component',
      layoutPart: appLayoutPart,
    },
    layout: '/app',
  },
  {
    name: AssetRegister.ComponentEdit,
    uri: '/asset/inventory/components/:id',
    component: EditComponentRoute,
    meta: {
      title: 'Component - Edit',
      description: 'Edit component information',
      layoutPart: appLayoutPart,
    },
    layout: '/app',
  },
  {
    name: Asset.Disposition.base,
    uri: `/asset/disposition`,
    icon: 'asset-disposition',
    auth: true,
    component: DispositionRoute,
    layout: '/app',
    meta: {
      title: 'Disposition',
      description: 'Display lists of asset for disposition',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Asset.Hire.base,
    uri: '/hire',
    icon: 'supply-chain',
    auth: true,
    component: AssetHireRoute,
    layout: '/app',
    meta: {
      title: 'Asset Hire',
      description: 'Display lists of asset for hire',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Maintenance.base,
    uri: '/maintenance',
    icon: 'services',
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Maintenance',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Maintenance.MyPanel.base,
    uri: '/maintenance/mypanel',
    icon: 'my-panel',
    auth: true,
    component: MaintenanceRoute,
    layout: '/app',
    meta: {
      title: 'My Panel',
      description: 'Display statistical representation of maintenance',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Maintenance.Timesheet.base,
    uri: '/maintenance/timesheet',
    icon: 'truck',
    auth: true,
    component: TimeSheet,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Time Sheet',
      description: 'Display lists of maintenance time sheet',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceTimesheet.New,
    uri: '/maintenance/timesheet/new',
    auth: true,
    component: TimeSheetNew,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Time Sheet',
      description: 'Display lists of maintenance time sheet',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceTimesheet.Edit,
    uri: '/maintenance/timesheet/:id',
    // name: 'maintenance.timesheet.edit',
    // uri: '/maintenance/timesheet/details/:id',
    auth: true,
    component: TimeSheetEdit,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Time Sheet',
      description: 'Display lists of maintenance time sheet',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Maintenance.Inspection.base,
    uri: '/maintenance/inspection',
    icon: 'truck',
    auth: true,
    component: MaintenanceInspectionRoute,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Inspection',
      description: 'Display lists of maintenance inspection',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceInspection.VehicleNew,
    uri: `/maintenance/inspection/vehicles/new`,
    icon: 'truck',
    auth: true,
    component: InspectionVehicleNew,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Vehicle',
      description: 'Vehicle Inspections',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceInspection.VehicleEdit,
    uri: `/maintenance/inspection/vehicles/:id`,
    icon: 'truck',
    auth: true,
    component: InspectionVehicleEdit,
    layout: '/app',
    isExact: true,
    meta: {
      title: 'Vehicle',
      description: 'Vehicle Inspections',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceInspection.GeneralAssetNew,
    uri: `/maintenance/inspection/generalassets/new`,
    icon: 'truck',
    auth: true,
    component: InspectionGeneralAssetNew,
    layout: '/app',
    meta: {
      title: 'General Asset',
      description: 'General Asset Inspections',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceInspection.GeneralAssetEdit,
    uri: `/maintenance/inspection/generalassets/:id`,
    icon: 'truck',
    auth: true,
    component: InspectionGeneralAssetEdit,
    layout: '/app',
    meta: {
      title: 'General Asset',
      description: 'General Asset Inspections',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceInspection.ComponentNew,
    uri: `/maintenance/inspection/components/new`,
    icon: 'truck',
    auth: true,
    component: InspectionComponentNew,
    layout: '/app',
    meta: {
      title: 'Component',
      description: 'Component Inspections',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceInspection.ComponentEdit,
    uri: `/maintenance/inspection/components/:id`,
    icon: 'truck',
    auth: true,
    component: InspectionComponentEdit,
    layout: '/app',
    meta: {
      title: 'Component',
      description: 'Component Inspections',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Maintenance.Estimate.base,
    uri: `/maintenance/estimate`,
    icon: 'truck',
    auth: true,
    isExact: true,
    component: MaintenanceEstimateRoute,
    layout: '/app',
    meta: {
      title: 'Work Estimate',
      description: 'Display lists of maintenance estimate',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceEstimate.ComponentNew,
    uri: `/maintenance/estimate/component/:id/new`,
    icon: 'truck',
    auth: true,
    component: NewEstimateComponentRoute,
    layout: '/app',
    meta: {
      title: 'Component',
      description: 'New component estimate',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceEstimate.ComponentEdit,
    uri: `/maintenance/estimate/:id/component`,
    icon: 'truck',
    auth: true,
    component: EditEstimateComponentRoute,
    layout: '/app',
    meta: {
      title: 'Component',
      description: 'Edit component estimate information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceEstimate.GeneralAssetNew,
    uri: `/maintenance/estimate/generalasset/new`,
    icon: 'truck',
    auth: true,
    component: NewEstimateGeneralAssetRoute,
    layout: '/app',
    meta: {
      title: 'General Asset',
      description: 'New general asset estimate',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceEstimate.GeneralAssetEdit,
    uri: `/maintenance/estimate/:id/generalasset`,
    icon: 'truck',
    auth: true,
    component: EditEstimateGeneralAssetRoute,
    layout: '/app',
    meta: {
      title: 'General Asset',
      description: 'Edit general asset estimate information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceEstimate.VehicleNew,
    uri: `/maintenance/estimate/vehicle/:id/new`,
    icon: 'truck',
    auth: true,
    component: NewEstimateVehicleRoute,
    layout: '/app',
    meta: {
      title: 'Vehicle',
      description: 'New vehicle estimate',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceEstimate.VehicleEdit,
    uri: `/maintenance/estimate/:id/vehicle`,
    icon: 'truck',
    auth: true,
    component: EditEstimateVehicleRoute,
    layout: '/app',
    meta: {
      title: 'Vehicle',
      description: 'Edit vehicle estimate information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Maintenance.WorkOrder.base,
    uri: `/maintenance/workorder`,
    icon: 'truck',
    auth: true,
    isExact: true,
    component: MaintenanceWorkOrderRoute,
    layout: '/app',
    meta: {
      title: 'Work Order',
      description: 'Display lists of maintenance work order',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceWorkOrder.VehicleNew,
    uri: `/maintenance/workorder/vehicle/:id/new`,
    icon: 'truck',
    auth: true,
    component: NewWorkOrderVehicleRoute,
    layout: '/app',
    meta: {
      title: 'Vehicle',
      description: 'New vehicle work order information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceWorkOrder.VehicleEdit,
    uri: `/maintenance/workorder/:id/vehicle`,
    icon: 'truck',
    auth: true,
    component: EditWorkOrderVehicleRoute,
    layout: '/app',
    meta: {
      title: 'Vehicle',
      description: 'Edit vehicle work order information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceWorkOrder.GeneralAssetNew,
    uri: `/maintenance/workorder/generalasset/:id/new`,
    icon: 'truck',
    auth: true,
    component: NewWorkOrderGeneralAssetRoute,
    layout: '/app',
    meta: {
      title: 'General Asset',
      description: 'New general asset work order information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceWorkOrder.GeneralAssetEdit,
    uri: `/maintenance/workorder/:id/generalasset`,
    icon: 'truck',
    auth: true,
    component: EditWorkOrderGeneralAssetRoute,
    layout: '/app',
    meta: {
      title: 'General Asset',
      description: 'Edit general asset work order information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceWorkOrder.ComponentNew,
    uri: `/maintenance/workorder/component/:id/new`,
    icon: 'truck',
    auth: true,
    component: NewWorkOrderComponentRoute,
    layout: '/app',
    meta: {
      title: 'Component',
      description: 'New component work order information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceWorkOrder.ComponentEdit,
    uri: `/maintenance/workorder/:id/component`,
    icon: 'truck',
    auth: true,
    component: EditWorkOrderComponentRoute,
    layout: '/app',
    meta: {
      title: 'Component',
      description: 'Edit component work order information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceWorkOrder.BOMNew,
    uri: `/maintenance/workorder/bom/:id/new`,
    icon: 'truck',
    auth: true,
    component: NewWorkOrderBOMRoute,
    layout: '/app',
    meta: {
      title: 'Bill of Material',
      description: 'New bill of material work order information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: MaintenanceWorkOrder.BOMEdit,
    uri: `/maintenance/workorder/:id/bom`,
    icon: 'truck',
    auth: true,
    component: EditWorkOrderBOMRoute,
    layout: '/app',
    meta: {
      title: 'Bill of Material',
      description: 'Edit bill of material work order information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Stock.base,
    uri: '/stock',
    icon: 'asset',
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Stock',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Stock.Inventory.base,
    uri: '/stock/inventory',
    icon: 'stocks',
    auth: true,
    component: StockRoute,
    layout: '/app',
    meta: {
      title: 'Inventory',
      description: 'Display lists of company stock',
      layoutPart: appLayoutPart,
    },
  },
  {
    // humanresources
    name: HumanResource.base,
    uri: '/humanresources',
    icon: 'human-resource',
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Human Resources',
      layoutPart: appLayoutPart,
    },
    // showOnSidebar: true,
  },
  {
    name: HumanResource.Personnel.base,
    uri: '/humanresource/personnel',
    icon: 'users',
    auth: true,
    isExact: true,
    component: PersonnelRoute,
    layout: '/app',
    meta: {
      title: 'Personnel',
      description: 'Display statistical representation of personnel',
      layoutPart: appLayoutPart,
    },
  },
  {
    // humanresources.personnel.add
    name: HumanResourcePersonnel.PersonnelNew,
    uri: '/humanresource/personnel/new',
    auth: true,
    component: NewPersonnelRoute, //PersonnelNew,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Personnel - New',
      description: 'Add New Personnel Record',
      layoutPart: appLayoutPart,
    },
  },
  {
    // humanresources.personnel.edit
    name: HumanResourcePersonnel.PersonnelEdit,
    uri: '/humanresource/personnel/:id',
    auth: true,
    component: EditPersonnelRoute, // PersonnelEdit,
    isExact: true,
    layout: '/app',
    meta: {
      title: 'Personnel - Edit',
      description: 'Edit Personnel Information',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Finance.base,
    uri: '/finance',
    icon: 'currency',
    auth: true,
    component: FinanceRoute,
    layout: '/app',
    meta: {
      title: 'Finance',
      description: 'Display lists of finance',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Setting.User.Management.base,
    uri: '/setting/user/management',
    isExact: true,
    icon: 'users',
    auth: true,
    global: true,
    component: UserManagementRoute,
    layout: '/app',
    meta: {
      title: 'User Management',
      description: 'Display lists of users',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: SettingUserManagement.New,
    uri: '/setting/user/management/new',
    auth: true,
    component: NewUserRoute,
    layout: '/app',
    isExact: true,
    meta: {
      title: 'User - New',
      description: 'Create new user',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: SettingUserManagement.Edit,
    uri: '/setting/user/management/:id',
    auth: true,
    component: EditUserRoute,
    layout: '/app',
    isExact: true,
    global: true,
    showOnSidebar: true,
    meta: {
      title: 'User - Edit',
      description: 'Edit user item',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Setting.User.ChangePassword.base,
    uri: '/setting/user/changepassword',
    auth: true,
    component: ChangeUserPasswordRoute,
    layout: '/app',
    icon: 'user',
    isExact: true,
    global: true,
    meta: {
      title: 'Change Password',
      description: 'Edit User password',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Setting.User.Profile.base,
    uri: '/setting/user/profile',
    auth: true,
    component: ViewProfile,
    layout: '/app',
    icon: 'user',
    isExact: true,
    global: true,
    meta: {
      title: 'Profile',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Setting.User.Session.base,
    uri: '/setting/user/session',
    auth: true,
    component: LoginSession,
    icon: 'users',
    layout: '/app',
    isExact: true,
    meta: {
      title: 'User Sessions',
      description: 'Display lists of user sessions',
      layoutPart: appLayoutPart,
    },
  },
  //   {
  //     name: Setting.Project.base,
  //     uri: '/setting/project',
  //     isExact: true,
  //     auth: true,
  //     component: Projects,
  //     layout: '/app',
  //     global: true,
  //     meta: {
  //       title: 'Projects',
  //       description: 'Display lists of projects',
  //       layoutPart: {
  //         header: true,
  //         footer: true,
  //         banner: true,
  //       },
  //     },
  //   },
  {
    name: SettingProject.New,
    uri: '/setting/project/new',
    auth: true,
    component: ProjectNew,
    layout: '/app',
    global: true,
    meta: {
      title: 'Project - Add New',
      description: 'Create new project',
      layoutPart: {
        header: true,
        footer: true,
        banner: true,
      },
    },
  },
  {
    id: 11111111,
    name: 'generalsetting',
    uri: '/general/',
    icon: 'asset',
    isExact: true,
    layout: '/admin',
    meta: {
      title: 'General Setting',
      layoutPart: appLayoutPart,
    },
  },
  {
    parentId: 11111111,
    name: 'generalsetting.project',
    uri: '/general/project/:id',
    auth: true,
    component: ProjectEdit,
    layout: '/admin',
    global: true,
    meta: {
      title: 'Project - Setting',
      description: 'Edit settings for this project',
      layoutPart: {
        header: true,
        footer: true,
        banner: true,
        aside: true,
      },
    },
  },
  {
    name: Setting.Role.base,
    uri: '/general/role',
    isExact: true,
    auth: true,
    component: Roles,
    layout: '/admin',
    meta: {
      title: 'Roles',
      description: 'Display lists of roles',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: SettingRole.New,
    uri: '/setting/role/new',
    auth: true,
    component: RoleNew,
    layout: '/app',
    meta: {
      title: 'Role - Add New',
      description: 'Create new role',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: SettingRole.Edit,
    uri: '/setting/role/:id',
    auth: true,
    component: RoleEdit,
    layout: '/app',
    meta: {
      title: 'Role - Edit',
      description: 'Edit role item',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Setting.StandardEntries.base,
    uri: '/setting/standardentries',
    icon: 'stocks',
    auth: true,
    component: StandardEntries,
    layout: '/app',
    global: true,
    meta: {
      title: 'Standard Entries',
      description: 'List of standard Entries',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Asset.Report.base,
    uri: '/asset/report',
    icon: 'report',
    auth: true,
    component: props => <ReportsView reportBy="subModule" showByModuleName="asset" {...props} />,
    layout: '/app',
    global: true,
    meta: {
      title: 'Report',
      description: 'Reports for Asset Module',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Stock.Quotation.base,
    uri: '/stock/quotation',
    icon: 'stocks',
    auth: true,
    layout: '/app',
    meta: {
      title: 'Quotation',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Stock.PurchaseOrder.base,
    uri: '/stock/purchaseorder',
    icon: 'stocks',
    auth: true,
    layout: '/app',
    meta: {
      title: 'Purchase Order',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Stock.Invoice.base,
    uri: '/stock/invoice',
    icon: 'stocks',
    auth: true,
    layout: '/app',
    meta: {
      title: 'Invoice',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Stock.Discrepancy.base,
    uri: '/stock/discrepancy',
    icon: 'stocks',
    auth: true,
    layout: '/app',
    meta: {
      title: 'Discrepancy Report',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Stock.DirectReceipt.base,
    uri: '/stock/directreceipt',
    icon: 'stocks',
    auth: true,
    layout: '/app',
    meta: {
      title: 'Direct Receipt',
      description: '',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Stock.Report.base,
    uri: '/stock/report',
    icon: 'asset',
    isExact: true,
    layout: '/app',
    component: props => <ReportsView reportBy="module" showByModuleName="stock" {...props} />,
    meta: {
      title: 'Report',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Maintenance.Report.base,
    uri: '/maintenance/report',
    icon: 'asset',
    isExact: true,
    layout: '/app',
    component: props => <ReportsView reportBy="module" showByModuleName="maintenance" {...props} />,
    meta: {
      title: 'Report',
      layoutPart: appLayoutPart,
    },
  },
  {
    name: Report.base,
    uri: '/report',
    icon: 'report',
    auth: true,
    component: props => <ReportsView reportBy="module" {...props} />,
    layout: '/app',
    meta: {
      title: 'Report',
      description: 'Reports for All Modules',
      layoutPart: appLayoutPart,
    },
  },
];

export const RoutesStatic: IRoutePageProps[] = [
  {
    name: 'projects',
    uri: '/projects',
    auth: true,
    icon: '',
    component: ProjectsRoute,
    layout: '/app',
    meta: {
      title: 'Projects',
      description: 'Shows graphical representation of records',
      layoutPart: {
        header: true,
      },
      container: {},
    },
  },
];

export default Routes;
