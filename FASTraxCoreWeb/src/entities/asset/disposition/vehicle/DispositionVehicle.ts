import DispositionVehicleJustification from './DispositionVehicleJustification';
import DispositionVehicleDamagedArea from './DispositionVehicleDamagedArea';
import DispositionVehicleRequiredRepair from './DispositionVehicleRequiredRepair';
import DispositionVehicleImage from './DispositionVehicleImage';
import DispositionVehicleDocument from './DispositionVehicleDocument';
import DispositionVehicleApproval from './DispositionVehicleApproval';
import * as yup from 'yup';

 export interface DispositionVehicle {
    // Primary Details
     id: number;
     dispositionNo: string;
     requestDateTime: Date;

     dispositionStatusId: number;
     dispositionTypeId: number;
     requestedById: number;
     requestingDepartmentId: number;

     // Vehicle Information
     vehicleId: number;
     vehicle?: Vehicle;
     assetCategoryId: number;

     dispositionVehicleJustification?: DispositionVehicleJustification;
     dispositionVehicleDamagedArea?: DispositionVehicleDamagedArea[];
     dispositionVehicleRequiredRepair?: DispositionVehicleRequiredRepair[];
     dispositionVehicleImage?: DispositionVehicleImage[];
     dispositionVehicleDocument?: DispositionVehicleDocument[];
     dispositionVehicleApproval?: DispositionVehicleApproval[];
 }

 export const dispositionVehicleShape = {
    dispositionStatusId: yup.number().min(1, 'Disposition Status is required.'),
    dispositionTypeId: yup.number().min(1, 'Disposition Type is required'),
};

export const newDispositionVehicleJustification = (): DispositionVehicleJustification => ({
    id: 0,
    dispositionVehicleId: 0,
    justification: '',
})

 export { DispositionVehicle as default }; 