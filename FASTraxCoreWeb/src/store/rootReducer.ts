import {Action, AnyAction, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {app, initialAppState} from './app/reducers';
import {
  estimateComponentReducer,
  initialEstimateComponentState,
} from './maintenance/estimate/component.reducers';
import {
  estimateGeneralAssetReducer,
  initialEstimateGeneralAssetState,
} from './maintenance/estimate/generalAsset.reducers';
import {
  estimateVehicleReducer,
  initialEstimateVehicleState,
} from './maintenance/estimate/vehicle.reducers';

import { personnelReducer } from './hr/personnel.reducers';

import {personnelWorkPermitReducer} from './hr/personnelWorkPermit.reducers';
import {personnelWorkVisaReducer} from './hr/personnelWorkVisa.reducers';
import {personnelBankAccountReducer} from './hr/personnelBankAccount.reducers';
import {personnelAddressReducer} from './hr/personnelAddress.reducers';
import {personnelWorkOtherClearanceReducer} from './hr/personnelWorkOtherClearance.reducers';
import {personnelImageAttachmentReducer} from './hr/personnelCustomFieldAttachment.Image.reducers';
import {personnelDocumentAttachmentReducer} from './hr/personnelCustomFieldAttachment.Document.reducers';
import {personnelWorkHistoryReducer} from './hr/personnelWorkHistory.reducers';

import {initialProjectsState, projects} from './catalog/projects/reducers';
import {initialUsersState, users} from './catalog/users/reducers';
import {initialWorkOrderBOMState, workOrderBOMReducer} from './maintenance/workorder/bom.reducers';
import {
  initialWorkOrderComponentState,
  workOrderComponentReducer,
} from './maintenance/workorder/component.reducers';
import {
  initialWorkOrderGeneralAssetState,
  workOrderGeneralAssetReducer,
} from './maintenance/workorder/generalAsset.reducers';
import {
  initialWorkOrderVehicleState,
  workOrderVehicleReducer,
} from './maintenance/workorder/vehicle.reducers';

import {attachmentDocuments} from './asset/inventory/attachmentDocuments.reducer';
import {attachmentImages} from './asset/inventory/attachmentImages.reducer';
import {entityCustomFields} from './common/entityCustomField.reducers';
import {errors} from './common/errors.reducer';
import {componentCustomFieldReducer} from './asset/register/componentCustomField.reducers';
import {componentDepreciationDetailReducer} from './asset/register/componentDepreciationDetail.reducers';
import {componentDocumentAttachmentReducer} from './asset/register/componentDocumentAttachment.reducers';
import {componentImageAttachmentReducer} from './asset/register/componentImageAttachment.reducers';
import {componentReducer} from './asset/register/component.reducers';
import {componentRegistrationDetailReducer} from './asset/register/componentRegistrationDetail.reducers';
import {componentWarrantyDetailReducer} from './asset/register/componentWarrantyDetail.reducers';
import {componentTransactionHistoryReducer} from './asset/register/componentTransactionHistory.reducers';
import {estimateComponentAdditionalChargeReducer} from './maintenance/estimate/componentAdditionalCharge.reducers';
import {estimateComponentDocumentAttachmentReducer} from './maintenance/estimate/componentDocumentAttachment.reducers';
import {estimateComponentImageAttachmentReducer} from './maintenance/estimate/componentImageAttachment.reducers';
import {estimateComponentMaterialReducer} from './maintenance/estimate/componentMaterial.reducers';
import {estimateGeneralAssetAdditionalChargeReducer} from './maintenance/estimate/generalAssetAdditionalCharge.reducers';
import {estimateGeneralAssetDocumentAttachmentReducer} from './maintenance/estimate/generalAssetDocumentAttachment.reducers';
import {estimateGeneralAssetImageAttachmentReducer} from './maintenance/estimate/generalAssetImageAttachment.reducers';
import {estimateGeneralAssetMaterialReducer} from './maintenance/estimate/generalAssetMaterial.reducers';
import {estimateVehicleAdditionalChargeReducer} from './maintenance/estimate/vehicleAdditionalCharge.reducers';
import {estimateVehicleDocumentAttachmentReducer} from './maintenance/estimate/vehicleDocumentAttachment.reducers';
import {estimateVehicleImageAttachmentReducer} from './maintenance/estimate/vehicleImageAttachment.reducers';
import {estimateVehicleMaterialReducer} from './maintenance/estimate/vehicleMaterial.reducers';
import {generalAssetCustomFieldReducer} from './asset/register/generalassetcustomfield.reducers';
import {generalAssetDepreciationDetailReducer} from './asset/register/generalassetdepreciationdetail.reducers';
import {generalAssetDocumentAttachmentReducer} from './asset/register/generalassetdocumentattachment.reducers';
import {generalAssetImageAttachmentReducer} from './asset/register/generalassetimageattachment.reducers';
import {generalAssetLinkedAssetReducer} from './asset/register/generalassetlinkedasset.reducers';
import {generalAssetReducer} from './asset/register/generalasset.reducers';
import {generalAssetRegistrationDetailReducer} from './asset/register/generalassetregistrationdetail.reducers';
import {generalAssetWarrantyDetailReducer} from './asset/register/generalassetwarrantydetail.reducers';
import {generalAssetTransactionHistoryReducer} from './asset/register/generalassettransactionhistory.reducers';
import {iRegistrationDetails} from './asset/inventory/registrationDetails.reducers';
import {iWarrantyDetails} from './asset/inventory/warrantyDetails.reducers';
import {linkedAssets} from './asset/inventory/linkedAssets.reducers';
import {pagePermissionActionReducer} from './settings/actions/action.reducer';
import {pagesReducer} from './settings/pages/reducers';
import {projectAssetCategoryReducer} from './catalog/projectassetcategory/projectassetcategory.reducer';
import {projectRoleReducer} from './catalog/projectroles/projectroles.reducer';
import {projectSiteReducer} from './catalog/projectsites/projectsites.reducer';
import {repairOperationDetailsReducer} from './maintenance/repairOperationDetails.reducers';
import {status} from './common/status.reducer';
import {userProjectSiteRoleReducer} from './catalog/users/user.projectsiterole.reducer';
import {vehicleArmourDetailReducer} from './asset/register/vehiclearmourdetail.reducers';
import {vehicleArmourDetails} from './asset/inventory/vehicleArmourDetails.reducers';
import {vehicleCustomFieldReducer} from './asset/register/vehiclecustomfield.reducers';
import {vehicleDepreciationDetailReducer} from './asset/register/vehicledepreciationdetail.reducers';
import {vehicleDocumentAttachmentReducer} from './asset/register/vehicledocumentattachment.reducers';
import {vehicleEngineHistoryReducer} from './asset/register/vehicleenginehistory.reducers';
import {vehicleFuelMonitoringReducer} from './asset/register/vehiclefuelmonitoring.reducers';
import {vehicleImageAttachmentReducer} from './asset/register/vehicleimageattachment.reducers';
import {vehicleLinkedAssetReducer} from './asset/register/vehiclelinkedasset.reducers';
import {vehicleOdometerHistoryReducer} from './asset/register/vehicleodometerhistory.reducers';
import {vehicleReducer} from './asset/register/vehicle.reducers';
import {vehicleRegistrationDetailReducer} from './asset/register/vehicleregistrationdetail.reducers';
import {vehicleWarrantyDetailReducer} from './asset/register/vehiclewarrantydetail.reducers';
import {workOrderBOMAdditionalChargeReducer} from './maintenance/workorder/bomAdditionalCharge.reducers';
import {workOrderBOMDocumentAttachmentReducer} from './maintenance/workorder/bomDocumentAttachment.reducers';
import {workOrderBOMImageAttachmentReducer} from './maintenance/workorder/bomImageAttachment.reducers';
import {workOrderBOMLabourReducer} from './maintenance/workorder/bomLabour.reducers';
import {workOrderBOMMaterialReducer} from './maintenance/workorder/bomMaterial.reducers';
import {workOrderComponentAdditionalChargeReducer} from './maintenance/workorder/componentAdditionalCharge.reducers';
import {workOrderComponentDocumentAttachmentReducer} from './maintenance/workorder/componentDocumentAttachment.reducers';
import {workOrderComponentImageAttachmentReducer} from './maintenance/workorder/componentImageAttachment.reducers';
import {workOrderComponentLabourReducer} from './maintenance/workorder/componentLabour.reducers';
import {workOrderComponentMaterialReducer} from './maintenance/workorder/componentMaterial.reducers';
import {workOrderComponentRepairSelectionReducer} from './maintenance/workorder/componentRepairSelection.reducers';
import {workOrderGeneralAssetAdditionalChargeReducer} from './maintenance/workorder/generalAssetAdditionalCharge.reducers';
import {workOrderGeneralAssetDocumentAttachmentReducer} from './maintenance/workorder/generalAssetDocumentAttachment.reducers';
import {workOrderGeneralAssetImageAttachmentReducer} from './maintenance/workorder/generalAssetImageAttachment.reducers';
import {workOrderGeneralAssetLabourReducer} from './maintenance/workorder/generalAssetLabour.reducers';
import {workOrderGeneralAssetMaterialReducer} from './maintenance/workorder/generalAssetMaterial.reducers';
import {workOrderVehicleAdditionalChargeReducer} from './maintenance/workorder/vehicleAdditionalCharge.reducers';
import {workOrderVehicleDocumentAttachmentReducer} from './maintenance/workorder/vehicleDocumentAttachment.reducers';
import {workOrderVehicleImageAttachmentReducer} from './maintenance/workorder/vehicleImageAttachment.reducers';
import {workOrderVehicleLabourReducer} from './maintenance/workorder/vehicleLabour.reducers';
import {workOrderVehicleMaterialReducer} from './maintenance/workorder/vehicleMaterial.reducers';
import {permissionReducer} from './settings/permissions/permission.default.reducer';
import {permissionCustomReducer} from './settings/permissions/permission.custom.reducer';

import {dispositionGeneralAssetRequiredRepairReducer} from './asset/disposition/generalasset/dispositionGeneralAssetRequiredRepair.reducers';
import {dispositionGeneralAssetDamagedAreaReducer} from './asset/disposition/generalasset/dispositionGeneralAssetDamagedArea.reducers';
import {dispositionGeneralAssetImageReducer} from './asset/disposition/generalasset/dispositionGeneralAssetImage.reducers';
import {dispositionGeneralAssetDocumentReducer} from './asset/disposition/generalasset/dispositionGeneralAssetDocument.reducers';
import {dispositionGeneralAssetApprovalReducer} from './asset/disposition/generalasset/dispositionGeneralAssetApproval.reducers';

import {dispositionVehicleRequiredRepairReducer} from './asset/disposition/vehicle/dispositionVehicleRequiredRepair.reducers';
import {dispositionVehicleDamagedAreaReducer} from './asset/disposition/vehicle/dispositionVehicleDamagedArea.reducers';
import {dispositionVehicleImageReducer} from './asset/disposition/vehicle/dispositionVehicleImage.reducers';
import {dispositionVehicleDocumentReducer} from './asset/disposition/vehicle/dispositionVehicleDocument.reducers';
import {dispositionVehicleApprovalReducer} from './asset/disposition/vehicle/dispositionVehicleApproval.reducers';

import {dispositionComponentRequiredRepairReducer} from './asset/disposition/component/dispositionComponentRequiredRepair.reducers';
import {dispositionComponentDamagedAreaReducer} from './asset/disposition/component/dispositionComponentDamagedArea.reducers';
import {dispositionComponentImageReducer} from './asset/disposition/component/dispositionComponentImage.reducers';
import {dispositionComponentDocumentReducer} from './asset/disposition/component/dispositionComponentDocument.reducers';
import {dispositionComponentApprovalReducer} from './asset/disposition/component/dispositionComponentApproval.reducers';
import { vehicleTransactionHistoryReducer } from './asset/register/vehicletransactionhistory.reducers';


//#region Asset

//#endregion

//#region Maintenance

//#end region

const rootReducer = combineReducers({
  app,
  users,
  projects,

  //#region Asset
  componentReducer,
  componentCustomFieldReducer,
  componentDepreciationDetailReducer,
  componentDocumentAttachmentReducer,
  componentImageAttachmentReducer,
  componentRegistrationDetailReducer,
  componentWarrantyDetailReducer,
  componentTransactionHistoryReducer,
  generalAssetReducer,
  generalAssetCustomFieldReducer,
  generalAssetDepreciationDetailReducer,
  generalAssetDocumentAttachmentReducer,
  generalAssetImageAttachmentReducer,
  generalAssetLinkedAssetReducer,
  generalAssetRegistrationDetailReducer,
  generalAssetWarrantyDetailReducer,
  generalAssetTransactionHistoryReducer,
  vehicleReducer,
  vehicleArmourDetailReducer,
  vehicleCustomFieldReducer,
  vehicleDepreciationDetailReducer,
  vehicleDocumentAttachmentReducer,
  vehicleEngineHistoryReducer,
  vehicleFuelMonitoringReducer,
  vehicleImageAttachmentReducer,
  vehicleLinkedAssetReducer,
  vehicleOdometerHistoryReducer,
  vehicleRegistrationDetailReducer,
  vehicleWarrantyDetailReducer,
  vehicleTransactionHistoryReducer,

  //Disposition
  dispositionGeneralAssetDamagedAreaReducer,
  dispositionGeneralAssetRequiredRepairReducer,
  dispositionGeneralAssetImageReducer,
  dispositionGeneralAssetDocumentReducer,
  dispositionGeneralAssetApprovalReducer,

  dispositionVehicleDamagedAreaReducer,
  dispositionVehicleRequiredRepairReducer,
  dispositionVehicleImageReducer,
  dispositionVehicleDocumentReducer,
  dispositionVehicleApprovalReducer,

  dispositionComponentDamagedAreaReducer,
  dispositionComponentRequiredRepairReducer,
  dispositionComponentImageReducer,
  dispositionComponentDocumentReducer,
  dispositionComponentApprovalReducer,

  //#endregion

  //#region
  personnelReducer, 
  personnelWorkPermitReducer,
  personnelWorkVisaReducer,
  personnelBankAccountReducer,
  personnelAddressReducer,
  personnelWorkOtherClearanceReducer,
  personnelImageAttachmentReducer,
  personnelDocumentAttachmentReducer,
  personnelWorkHistoryReducer,
  ////#endregion

  //#region maintenance
  estimateComponentReducer,
  estimateComponentAdditionalChargeReducer,
  estimateComponentDocumentAttachmentReducer,
  estimateComponentImageAttachmentReducer,
  estimateComponentMaterialReducer,
  estimateGeneralAssetReducer,
  estimateGeneralAssetAdditionalChargeReducer,
  estimateGeneralAssetDocumentAttachmentReducer,
  estimateGeneralAssetImageAttachmentReducer,
  estimateGeneralAssetMaterialReducer,
  estimateVehicleReducer,
  estimateVehicleAdditionalChargeReducer,
  estimateVehicleDocumentAttachmentReducer,
  estimateVehicleMaterialReducer,
  estimateVehicleImageAttachmentReducer,
  repairOperationDetailsReducer,
  workOrderBOMReducer,
  workOrderBOMAdditionalChargeReducer,
  workOrderBOMDocumentAttachmentReducer,
  workOrderBOMImageAttachmentReducer,
  workOrderBOMLabourReducer,
  workOrderBOMMaterialReducer,
  workOrderComponentReducer,
  workOrderComponentAdditionalChargeReducer,
  workOrderComponentDocumentAttachmentReducer,
  workOrderComponentImageAttachmentReducer,
  workOrderComponentLabourReducer,
  workOrderComponentMaterialReducer,
  workOrderComponentRepairSelectionReducer,
  workOrderGeneralAssetReducer,
  workOrderGeneralAssetAdditionalChargeReducer,
  workOrderGeneralAssetDocumentAttachmentReducer,
  workOrderGeneralAssetImageAttachmentReducer,
  workOrderGeneralAssetLabourReducer,
  workOrderGeneralAssetMaterialReducer,
  workOrderVehicleReducer,
  workOrderVehicleAdditionalChargeReducer,
  workOrderVehicleDocumentAttachmentReducer,
  workOrderVehicleImageAttachmentReducer,
  workOrderVehicleLabourReducer,
  workOrderVehicleMaterialReducer,
  //#endregion

  //#region asset-ownership-form
  errors,
  linkedAssets,
  attachmentDocuments,
  attachmentImages,
  entityCustomFields,
  iRegistrationDetails,
  iWarrantyDetails,
  vehicleArmourDetails,
  //#endregion

  status,
  projectRoleReducer,
  projectSiteReducer,
  userProjectSiteRoleReducer,
  pagesReducer,
  projectAssetCategoryReducer,
  pagePermissionActionReducer,
  permissionReducer,
  permissionCustomReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ReduxThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type StoreDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export const initialMockState = (): RootState => ({
  app: initialAppState,
  users: initialUsersState,
  projects: initialProjectsState,

  //#region Asset
  componentReducer: {},
  componentCustomFieldReducer: {},
  componentDepreciationDetailReducer: {},
  componentDocumentAttachmentReducer: {},
  componentImageAttachmentReducer: {},
  componentRegistrationDetailReducer: {},
  componentWarrantyDetailReducer: {},
  componentTransactionHistoryReducer: {},
  generalAssetReducer: {},
  generalAssetCustomFieldReducer: {},
  generalAssetDepreciationDetailReducer: {},
  generalAssetDocumentAttachmentReducer: {},
  generalAssetImageAttachmentReducer: {},
  generalAssetLinkedAssetReducer: {},
  generalAssetRegistrationDetailReducer: {},
  generalAssetWarrantyDetailReducer: {},
  generalAssetTransactionHistoryReducer: {},
  vehicleReducer: {},
  vehicleArmourDetailReducer: {},
  vehicleCustomFieldReducer: {},
  vehicleDepreciationDetailReducer: {},
  vehicleDocumentAttachmentReducer: {},
  vehicleEngineHistoryReducer: {},
  vehicleFuelMonitoringReducer: {},
  vehicleImageAttachmentReducer: {},
  vehicleLinkedAssetReducer: {},
  vehicleOdometerHistoryReducer: {},
  vehicleRegistrationDetailReducer: {},
  vehicleWarrantyDetailReducer: {},
  vehicleTransactionHistoryReducer: {},

  dispositionGeneralAssetDamagedAreaReducer: [],
  dispositionGeneralAssetRequiredRepairReducer: [],
  dispositionGeneralAssetImageReducer: [],
  dispositionGeneralAssetDocumentReducer: [],
  dispositionGeneralAssetApprovalReducer: [],

  dispositionVehicleDamagedAreaReducer: [],
  dispositionVehicleRequiredRepairReducer: [],
  dispositionVehicleImageReducer: [],
  dispositionVehicleDocumentReducer: [],
  dispositionVehicleApprovalReducer: [],

  dispositionComponentDamagedAreaReducer: [],
  dispositionComponentRequiredRepairReducer: [],
  dispositionComponentImageReducer: [],
  dispositionComponentDocumentReducer: [],
  dispositionComponentApprovalReducer: [],
  //#endregion

  //#region human resource
  
  personnelReducer: {},
  personnelWorkPermitReducer: {},
  personnelWorkVisaReducer: {},
  personnelBankAccountReducer: {},
  personnelAddressReducer: {},
  personnelWorkOtherClearanceReducer: {},
  personnelImageAttachmentReducer: {},
  personnelDocumentAttachmentReducer: {},
  personnelWorkHistoryReducer: {},

  //#endregion
  
  //#region maintenance
  estimateComponentReducer: initialEstimateComponentState,
  estimateComponentAdditionalChargeReducer: [],
  estimateComponentDocumentAttachmentReducer: [],
  estimateComponentImageAttachmentReducer: [],
  estimateComponentMaterialReducer: [],
  estimateGeneralAssetReducer: initialEstimateGeneralAssetState,
  estimateGeneralAssetAdditionalChargeReducer: [],
  estimateGeneralAssetDocumentAttachmentReducer: [],
  estimateGeneralAssetImageAttachmentReducer: [],
  estimateGeneralAssetMaterialReducer: [],
  estimateVehicleReducer: initialEstimateVehicleState,
  estimateVehicleAdditionalChargeReducer: [],
  estimateVehicleDocumentAttachmentReducer: [],
  estimateVehicleMaterialReducer: [],
  estimateVehicleImageAttachmentReducer: [],
  repairOperationDetailsReducer: [],
  workOrderBOMReducer: initialWorkOrderBOMState,
  workOrderBOMAdditionalChargeReducer: [],
  workOrderBOMDocumentAttachmentReducer: [],
  workOrderBOMImageAttachmentReducer: [],
  workOrderBOMLabourReducer: [],
  workOrderBOMMaterialReducer: [],
  workOrderComponentReducer: initialWorkOrderComponentState,
  workOrderComponentAdditionalChargeReducer: [],
  workOrderComponentDocumentAttachmentReducer: [],
  workOrderComponentImageAttachmentReducer: [],
  workOrderComponentLabourReducer: [],
  workOrderComponentMaterialReducer: [],
  workOrderComponentRepairSelectionReducer: [],
  workOrderGeneralAssetReducer: initialWorkOrderGeneralAssetState,
  workOrderGeneralAssetAdditionalChargeReducer: [],
  workOrderGeneralAssetDocumentAttachmentReducer: [],
  workOrderGeneralAssetImageAttachmentReducer: [],
  workOrderGeneralAssetLabourReducer: [],
  workOrderGeneralAssetMaterialReducer: [],
  workOrderVehicleReducer: initialWorkOrderVehicleState,
  workOrderVehicleAdditionalChargeReducer: [],
  workOrderVehicleDocumentAttachmentReducer: [],
  workOrderVehicleImageAttachmentReducer: [],
  workOrderVehicleLabourReducer: [],
  workOrderVehicleMaterialReducer: [],
  //#endregion

  //#region asset-ownership-form
  errors: {},
  linkedAssets: [],
  attachmentDocuments: [],
  attachmentImages: [],
  entityCustomFields: [],
  iRegistrationDetails: [],
  iWarrantyDetails: [],
  vehicleArmourDetails: [],
  //#endregion

  status: '',
  projectRoleReducer: {},
  projectSiteReducer: {},
  userProjectSiteRoleReducer: {},
  pagesReducer: {},
  projectAssetCategoryReducer: {},
  pagePermissionActionReducer: {},
  permissionReducer: [],
  permissionCustomReducer: {},
});

export default rootReducer;
