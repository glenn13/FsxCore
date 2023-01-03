import DispositionComponentJustification from "./DispositionComponentJustification";
import DispositionComponentDamagedArea from "./DispositionComponentDamagedArea";
import DispositionComponentRequiredRepair from "./DispositionComponentRequiredRepair";
import DispositionComponentImage from "./DispositionComponentImage";
import DispositionComponentDocument from "./DispositionComponentDocument";
import DispositionComponentApproval from "./DispositionComponentApproval";
import * as yup from 'yup';

 export interface DispositionComponent {
    //Primary Details
     id: number;
     dispositionNo: string;
     requestDateTime: Date;

     dispositionStatusId: number;
     dispositionTypeId: number;
     requestedById: number;
     requestingDepartmentId: number;

     //Component Information
     componentId: number;
     component?: Component;
     assetCategoryId: number;

     dispositionComponentJustification?: DispositionComponentJustification;
     dispositionComponentDamagedArea?: DispositionComponentDamagedArea[];
     dispositionComponentRequiredRepair?: DispositionComponentRequiredRepair[];
     dispositionComponentImage?: DispositionComponentImage[];
     dispositionComponentDocument?: DispositionComponentDocument[];
     dispositionComponentApproval?: DispositionComponentApproval[];
 }

 export const dispositionComponentShape = {
    dispositionStatusId: yup.number().min(1, 'Disposition Status is required.'),
    dispositionTypeId: yup.number().min(1, 'Disposition Type is required'),
};

export const newDispositionComponentJustification = (): DispositionComponentJustification => ({
    id: 0,
    dispositionComponentId: 0,
    justification: '',
})

export { DispositionComponent as default }; 