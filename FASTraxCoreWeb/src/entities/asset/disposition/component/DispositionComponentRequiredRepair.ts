import { BaseEntity } from "../../../base";
import DispositionComponent from "./DispositionComponent";
import * as yup from 'yup';
import DispositionRequiredRepair from "../../standard-entries/DispositionRequiredRepair";
export interface DispositionComponentRequiredRepair extends BaseEntity {
    tempId: number;
    dispositionComponentId: number;

    isRequiredRepair: boolean;

    dispositionRequiredRepairId: number;
    
    dispositionComponent?: DispositionComponent;
    dispositionRequiredRepair?: DispositionRequiredRepair;
}

export const dispositionComponentRequiredRepairShape = {
    dispositionRequiredRepairId: yup.number().min(1, 'Disposition Required Repair is required.'),
};

export { DispositionComponentRequiredRepair as default }; 