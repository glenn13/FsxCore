import { BaseEntity } from "../../base";

export default interface WorkOrderComponentTotal extends BaseEntity {
    workOrderComponentId: number;

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