import { BaseEntity } from "../base";

export default interface RepairOperationSelection  {
    tempId: number;
    id: string;
    repairGroupId: number;
    repairGroupSRO: string;
    repairGroup: string;
    repairSubGroupId: number;
    repairSubGroupSRO: string;
    repairSubGroup: string;
    checked: boolean;
    selected: boolean;
}