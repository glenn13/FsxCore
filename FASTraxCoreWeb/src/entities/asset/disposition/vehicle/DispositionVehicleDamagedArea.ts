import { BaseEntity } from "../../../base";
import DispositionVehicle from "./DispositionVehicle";
import DispositionDamagedArea from "../../standard-entries/DispositionDamagedArea";
import * as yup from 'yup';
export interface DispositionVehicleDamagedArea extends BaseEntity {
    tempId: number;
    dispositionVehicleId: number;

    isDamagedArea: boolean;

    dispositionDamagedAreaId: number;
    
    dispositionVehicle?: DispositionVehicle;
    dispositionDamagedArea?: DispositionDamagedArea;
}

export const dispositionVehicleDamagedAreaShape = {
    dispositionDamagedAreaId: yup.number().min(1, 'Disposition Damaged Area is required.'),
};

export { DispositionVehicleDamagedArea as default }; 