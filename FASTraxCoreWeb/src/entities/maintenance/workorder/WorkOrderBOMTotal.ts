import { BaseEntity } from "../../base";

export default interface WorkOrderBOMTotal extends BaseEntity {
    workOrderBOMId: number;

    estimateLabour?: number;
    estimateMaterial?: number;
    estimateOther?: number;
    estimateGross?: number;
    estimateDiscount?: number;
    estimateNet?: number;
    actualLabour?: number;
    actualMaterial?: number;
    actualOther?: number;
    actualGross?: number;
    actualDiscount?: number;
    actualNet?: number;
}