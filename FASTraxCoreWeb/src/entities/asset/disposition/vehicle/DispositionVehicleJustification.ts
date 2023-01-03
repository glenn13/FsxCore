import { BaseEntity } from "../../../base";

export default interface DispositionVehicleJustification extends BaseEntity {
    dispositionVehicleId: number;
    justification: string;
}