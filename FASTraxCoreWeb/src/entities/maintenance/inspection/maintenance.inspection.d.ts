/* -------------------------------------------------------------------------- */
/*                             Inspection Vehicle                             */
/* -------------------------------------------------------------------------- */
interface InspectionVehicle {
  id?: number;
  inspectionNumber: string;
  dateIssued: Date;
  dateCompleted: Date | undefined | null;
  maintenanceScheduleId: number | undefined | null;
  maintenanceStatusId: number | undefined | null;
  workOrderVehicleId: number | undefined | null;
  estimateVehicleId: number | undefined | null;
  vehicleId: number | undefined | null;
  currentOdometerReading: string;
  fuelOnReceive: string;
  fuelOnRelease: string;
  inspectionVehicleCustomerDetails: InspectionCustomerDetails | null;
  inspectionVehicleAssignmentAndApproval: InspectionAssignmentAndApproval | null;
  inspectionVehicleInspectionDetails: VehicleInspectionDetails[] | undefined;
}

/* -------------------------------------------------------------------------- */
/*                          Inspection General Asset                          */
/* -------------------------------------------------------------------------- */
interface InspectionGeneralAsset {
  id?: number;
  inspectionNumber: string;
  dateIssued: Date;
  dateCompleted: Date | undefined | null;
  maintenanceScheduleId: number | undefined | null;
  maintenanceStatusId: number | undefined | null;
  workOrderGeneralAssetId: number | undefined | null;
  estimateGeneralAssetId: number | undefined | null;
  generalAssetId: number | undefined | null;
  currentOdometerReading: string;
  fuelOnReceive: string;
  fuelOnRelease: string;
  inspectionGeneralAssetCustomerDetails: InspectionCustomerDetails | null;
  inspectionGeneralAssetAssignmentAndApproval: InspectionAssignmentAndApproval | null;
  inspectionGeneralAssetInspectionDetails: GeneralAssetInspectionDetails[] | undefined;
}

/* -------------------------------------------------------------------------- */
/*                            Inspection Component                            */
/* -------------------------------------------------------------------------- */
interface InspectionComponent {
  id?: number;
  inspectionNumber: string;
  dateIssued: Date;
  dateCompleted: Date | undefined | null;
  maintenanceScheduleId: number | undefined | null;
  maintenanceStatusId: number | undefined | null;
  workOrderComponentId: number | undefined | null;
  estimateComponentId: number | undefined | null;
  componentId: number | undefined | null;
  inspectionComponentCustomerDetails: InspectionCustomerDetails | null;
  inspectionComponentAssignmentAndApproval: InspectionAssignmentAndApproval | null;
  inspectionComponentInspectionDetails: ComponentInspectionDetails[] | undefined;
}

/* -------------------------------------------------------------------------- */
/*                         Inspection Customer Details                        */
/* -------------------------------------------------------------------------- */
interface InspectionCustomerDetails {
  id?: number;
  customerId: number;
  pocName: string;
  pocMobileNumber: string;
  pocEmailAddress: string;
}

/* -------------------------------------------------------------------------- */
/*                     Inspection Assignment and Approval                     */
/* -------------------------------------------------------------------------- */
interface InspectionAssignmentAndApproval {
  id?: number;
  preparedById: number;
  performedById: number;
  notedOrConfirmedById: number;
  additionalRemarks?: string;
}

/* -------------------------------------------------------------------------- */
/*                         Vehicle Inspection Details                         */
/* -------------------------------------------------------------------------- */
interface VehicleInspectionDetails {
  id?: number;
  maintenanceVehicleInspectionAreaId: number | undefined | null;
  details?: string;
  passed: boolean;
  actionTaken?: string;
  remarks?: string;
}

/* -------------------------------------------------------------------------- */
/*                        Component Inspection Details                        */
/* -------------------------------------------------------------------------- */
interface ComponentInspectionDetails {
  id?: number;
  maintenanceComponentInspectionAreaId: number | undefined | null;
  details?: string;
  passed: boolean;
  actionTaken?: string;
  remarks?: string;
}

/* -------------------------------------------------------------------------- */
/*                      General Asset Inspection Details                      */
/* -------------------------------------------------------------------------- */
interface GeneralAssetInspectionDetails {
  id?: number;
  maintenanceGeneralAssetInspectionAreaId: number | undefined | null;
  details?: string;
  passed: boolean;
  actionTaken?: string;
  remarks?: string;
}

/* -------------------------------------------------------------------------- */
/*                               Inspection Area                              */
/* -------------------------------------------------------------------------- */
interface InspectionArea extends StandardEntry {
  prePopulated: boolean;
}

// TODO: Make this interface into declaration file
// !Temporary
/* -------------------------------------------------------------------------- */
/*                               Standard Entry                               */
/* -------------------------------------------------------------------------- */
interface StandardEntry {
  id: number;
  code: string;
  title: string;
  description?: string;
}

/* -------------------------------------------------------------------------- */
/*                             Inspection Summary                             */
/* -------------------------------------------------------------------------- */
interface InspectionSummary {
  inspectionId: number;
  inspectionNumber: string;
  maintenanceStatus: string;
  assetId: number;
  vinSerialNumber: string;
  category: string;
  title: string;
  dateIssued: Date;
  department: string;
  location: string;
  createdBy: string;
  lastUpdate: Date;
}
