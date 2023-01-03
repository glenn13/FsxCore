import { BaseEntity } from "../../../base";
import DispositionGeneralAsset from "./DispositionGeneralAsset";
import * as yup from 'yup';
import DispositionRequiredRepair from "../../standard-entries/DispositionRequiredRepair";
export interface DispositionGeneralAssetRequiredRepair extends BaseEntity {
    tempId: number;
    dispositionGeneralAssetId: number;

    isRequiredRepair: boolean;

    dispositionRequiredRepairId: number;
    
    dispositionGeneralAsset?: DispositionGeneralAsset;
    dispositionRequiredRepair?: DispositionRequiredRepair;
}

export const dispositionGeneralAssetRequiredRepairShape = {
    dispositionRequiredRepairId: yup.number().min(1, 'Disposition Required Repair is required.'),
};

export { DispositionGeneralAssetRequiredRepair as default }; 