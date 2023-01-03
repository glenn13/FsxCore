import { BaseEntity } from "../../../base";
import DispositionVehicle from "./DispositionVehicle";
import * as yup from 'yup';
import DispositionRequiredRepair from "../../standard-entries/DispositionRequiredRepair";
export interface DispositionVehicleRequiredRepair extends BaseEntity {
    tempId: number;
    dispositionVehicleId: number;

    isRequiredRepair: boolean;

    dispositionRequiredRepairId: number;
    
    dispositionVehicle?: DispositionVehicle;
    dispositionRequiredRepair?: DispositionRequiredRepair;
}

export const dispositionVehicleRequiredRepairShape = {
    dispositionRequiredRepairId: yup.number().min(1, 'Disposition Required Repair is required.'),
};

export { DispositionVehicleRequiredRepair as default }; 