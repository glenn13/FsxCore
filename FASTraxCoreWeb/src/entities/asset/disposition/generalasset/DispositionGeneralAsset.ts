import DispositionGeneralAssetJustification from "./DispositionGeneralAssetJustification";
import DispositionGeneralAssetDamagedArea from "./DispositionGeneralAssetDamagedArea";
import DispositionGeneralAssetRequiredRepair from "./DispositionGeneralAssetRequiredRepair";
import DispositionGeneralAssetImage from "./DispositionGeneralAssetImage";
import DispositionGeneralAssetDocument from "./DispositionGeneralAssetDocument";
import DispositionGeneralAssetApproval from "./DispositionGeneralAssetApproval";
import * as yup from 'yup';

 export interface DispositionGeneralAsset {
    // Primary Details
     id: number;
     dispositionNo: string;
     requestDateTime: Date;

     dispositionStatusId: number;
     dispositionTypeId: number;
     requestedById: number;
     requestingDepartmentId: number;

     // General Asset Information
     generalAssetId: number;
     generalAsset?: GeneralAsset;
     assetCategoryId: number;

     dispositionGeneralAssetJustification?: DispositionGeneralAssetJustification;
     dispositionGeneralAssetDamagedArea?: DispositionGeneralAssetDamagedArea[];
     dispositionGeneralAssetRequiredRepair?: DispositionGeneralAssetRequiredRepair[];
     dispositionGeneralAssetImage?: DispositionGeneralAssetImage[];
     dispositionGeneralAssetDocument?: DispositionGeneralAssetDocument[];
     dispositionGeneralAssetApproval?: DispositionGeneralAssetApproval[];
 }

export const dispositionGeneralAssetShape = {
    dispositionStatusId: yup.number().min(1, 'Disposition Status is required.'),
    dispositionTypeId: yup.number().min(1, 'Disposition Type is required'),
};

export const newDispositionGeneralAssetJustification = (): DispositionGeneralAssetJustification => ({
    id: 0,
    dispositionGeneralAssetId: 0,
    justification: '',
})

export { DispositionGeneralAsset as default }; 