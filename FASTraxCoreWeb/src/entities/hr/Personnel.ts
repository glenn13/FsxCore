import * as yup from 'yup';

import { BaseEntity } from "@app/entities/base";

import HumanResourceDepartment from "./standard-entries/HumanResourceDepartment";
import PersonnelPosition from "./standard-entries/PersonnelPosition";
import PersonnelStatus from "./standard-entries/PersonnelStatus";
import PersonnelGroup from "./standard-entries/PersonnelGroup";
import SkillLevel from "./standard-entries/SkillLevel";
import JobCode from "./standard-entries/JobCode";
import Nationality from "./standard-entries/Nationality";
import Status from "./standard-entries/Status";
import Category from "./standard-entries/Category";
import PersonnelWorkPermit from "./PersonnelWorkPermit";
import PersonnelWorkVisa from "./PersonnelWorkVisa";
import PersonnelBankAccount from './PersonnelBankAccount';
import MaritalStatus from "./standard-entries/MaritalStatus";
import PersonnelAddress from './PersonnelAddress';
import PersonnelWorkOtherClearance from './PersonnelWorkOtherClearance';
import PersonnelImageAttachment from './PersonnelImageAttachment';
import PersonnelDocumentAttachment from './PersonnelDocumentAttachment';
import PersonnelWorkInformation from './PersonnelWorkInformation';
import PersonnelWorkHistory from './PersonnelWorkHistory';

// export default interface Personnel extends BaseEntity  { 
export default interface Personnel extends BaseEntity  {
    // PersonnelNumber: string;
    id: number;
    personnelNo: string; //  | undefined
    firstName: string; //  | undefined
    middleName: string; //  | undefined
    lastName: string; //  | undefined
    // personalIdNo: string; //  | undefined
    assignedIdNo: string;  //  | undefined //Need to delete this and any related module using this property will be change to PersonnelNumber
    contactNo: string; //  | undefined
    assignedEmail: string; //  | undefined 
    chatId: string; //  | undefined 
    gender: string; 
    citizenship: string; 

    altContactNo: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    birthdate: Date;
    birthPlace: string;
    personalEmailAddress: string;
    nativeLanguage: string;
    maritalStatusId: number;
    height: string;
    weight: string;
    religion: string;

    humanResourceDepartmentId: number;
    humanResourcePositionId: number;
    humanResourceStatusId: number;
    humanResourceGroupId: number;
    humanResourceCategoryId: number;
    skillLevelId: number;
    jobCodeId: number;
    nationalityId: number;
    projectId: number;
    projectSiteId: number;
    fileName: string;
    file: string;
    fileType: string;
    fileSize: number;

    humanResourceDepartment?: HumanResourceDepartment; // | null
    humanResourcePosition?: PersonnelPosition; // | null
    humanResourceStatus?: PersonnelStatus; // | null
    humanResourceGroup?: PersonnelGroup; // | null
    humanResourceCategory?: Category; // | null
    nationality?: Nationality; // | null
    skillLevel?: SkillLevel; // | null
    jobCode?: JobCode; // | null
    maritalStatus?: MaritalStatus; // | null
    // humanResourceStatus: Status | null;
    fullName?: string;
    personnelWorkPermit?: PersonnelWorkPermit[]; // | null;
    personnelWorkVisa?: PersonnelWorkVisa[];
    personnelBankAccount?: PersonnelBankAccount[];
    personnelAddress?: PersonnelAddress[];
    personnelWorkOtherClearance?: PersonnelWorkOtherClearance[];
    personnelImageAttachment?: PersonnelImageAttachment[];
    personnelDocumentAttachment?: PersonnelDocumentAttachment[];
    // personnelWorkInformation?: PersonnelWorkInformation;
    personnelWorkInformation?: PersonnelWorkInformation[];
    personnelWorkHistory?: PersonnelWorkHistory[];

    
// humanResourcePosition: StandardEntry;
// humanResourceStatus: StandardEntry;
// humanResourceGroup: StandardEntry;
// skillLevel: StandardEntry;
}

export const personnelShape = {
    humanResourceDepartmentId: yup.number().min(1, 'Department is required.').required(),
    humanResourcePositionId: yup.number().min(1, 'Position is required.').required(),
    humanResourceStatusId: yup.number().min(1, 'Status is required.').required(),
    humanResourceGroupId: yup.number().min(1, 'Group is required.').required(),
    // skillLevelId: yup.number().min(1, 'Skill Level is required.').required(),
    jobCodeId: yup.number().min(1, 'Job Code is required.').required(),
    assignedIdNo: yup.string().required('Assigned ID Number is required!'),
    firstName: yup.string().required('First Name is required!'),
    lastName: yup.string().required('Last Name is required!')
}
