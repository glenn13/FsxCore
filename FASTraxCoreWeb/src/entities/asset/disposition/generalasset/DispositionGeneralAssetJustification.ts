import { BaseEntity } from "../../../base";

export default interface DispositionGeneralAssetJustification extends BaseEntity {
    dispositionGeneralAssetId: number;
    justification: string;
}