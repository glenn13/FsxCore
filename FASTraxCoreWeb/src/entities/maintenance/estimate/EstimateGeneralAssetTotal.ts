import { BaseEntity } from './../../base';

export default interface EstimateGeneralAssetTotal extends BaseEntity {
    estimateGeneralAssetId: number;

    estimateDiscount?: number;
    estimateGross?: number;
    estimateLabour?: number;
    estimateMaterial?: number;
    estimateNet?: number;
    estimateOther?: number;
    approvedDiscount?: number;
    approvedGross?: number;
    approvedLabour?: number;
    approvedMaterial?: number;
    approvedNet?: number;
    approvedOther?: number;
}
