import { BaseEntity } from "../../../base";

export default interface DispositionComponentJustification extends BaseEntity {
    dispositionComponentId: number;
    justification: string;
}