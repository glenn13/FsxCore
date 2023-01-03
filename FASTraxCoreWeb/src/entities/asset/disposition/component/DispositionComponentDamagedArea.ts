import { BaseEntity } from "../../../base";
import DispositionComponent from "./DispositionComponent";
import DispositionDamagedArea from "../../standard-entries/DispositionDamagedArea";
import * as yup from 'yup';
export interface DispositionComponentDamagedArea extends BaseEntity {
    tempId: number;
    dispositionComponentId: number;

    isDamagedArea: boolean;

    dispositionDamagedAreaId: number;
    
    dispositionComponent?: DispositionComponent;
    dispositionDamagedArea?: DispositionDamagedArea;
}

export const dispositionComponentDamagedAreaShape = {
    dispositionDamagedAreaId: yup.number().min(1, 'Disposition Damaged Area is required.'),
};

export { DispositionComponentDamagedArea as default }; 