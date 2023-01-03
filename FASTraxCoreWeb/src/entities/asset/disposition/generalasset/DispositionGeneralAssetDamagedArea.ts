import { BaseEntity } from "../../../base";
import DispositionGeneralAsset from "./DispositionGeneralAsset";
import DispositionDamagedArea from "../../standard-entries/DispositionDamagedArea";
import * as yup from 'yup';
export interface DispositionGeneralAssetDamagedArea extends BaseEntity {
    tempId: number;
    dispositionGeneralAssetId: number;

    isDamagedArea: boolean;

    dispositionDamagedAreaId: number;
    
    dispositionGeneralAsset?: DispositionGeneralAsset;
    dispositionDamagedArea?: DispositionDamagedArea;
}

export const dispositionGeneralAssetDamagedAreaShape = {
    dispositionDamagedAreaId: yup.number().min(1, 'Disposition Damaged Area is required.'),
};

export { DispositionGeneralAssetDamagedArea as default }; 