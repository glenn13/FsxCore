import * as yup from 'yup';
import { AssetCategoryEnum } from '@app/helpers/asset/enum';
import { generateNegativeNumber, generateUUID } from '@app/helpers/randoms';
import Personnel from '@app/entities/hr/Personnel';
import PersonnelWorkPermit from '@app/entities/hr/PersonnelWorkPermit';
import PersonnelWorkVisa from '@app/entities/hr/PersonnelWorkVisa';
import PersonnelBankAccount from '@app/entities/hr/PersonnelBankAccount';
import PersonnelAddress from '@app/entities/hr/PersonnelAddress';
import PersonnelWorkOtherClearance from '@app/entities/hr/PersonnelWorkOtherClearance';
import PersonnelImageAttachment from '@app/entities/hr/PersonnelImageAttachment';
import PersonnelDocumentAttachment from '@app/entities/hr/PersonnelDocumentAttachment';
// import Country from '@app/entities/catalog/Country';


export const newPersonnel = (tempIds?: number[]): Personnel => ({
    id: 0,
    personnelNo: '', 
    firstName: '', 
    middleName: '', 
    lastName: '', 
    assignedIdNo: ''+generateUUID()+'', 
    contactNo: '', 
    assignedEmail: '', 
    chatId: '',
    gender: '', 
    citizenship: '',  
    fileName: '',
    fileSize: 0,
    file: '',
    fileType: '',
 
    altContactNo: '',
    fatherName: '', 
    motherName: '',
    spouseName: '',
    birthdate: new Date(), 
    birthPlace: '',
    personalEmailAddress: '', 
    nativeLanguage: '',
    maritalStatusId: 1,
    height: '',
    weight: '',
    religion: '',
    projectId: 0,
    projectSiteId: 0,


    humanResourceDepartmentId: 0,
    humanResourcePositionId: 0,
    humanResourceStatusId: 0,
    humanResourceGroupId: 0,
    humanResourceCategoryId: 0,
    skillLevelId: 4,
    jobCodeId: 0,
    nationalityId: 0,

    personnelWorkPermit: [],
    personnelWorkVisa: [], 
    personnelBankAccount: [], 
    personnelAddress: [],
    personnelWorkOtherClearance: [],
    personnelImageAttachment: [],
    personnelDocumentAttachment: [],
    personnelWorkInformation: [],
    // personnelWorkInformation: undefined,
    
});

export const newWorkPermit = (tempIds?: number[]): PersonnelWorkPermit => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    personnelId: 0,
    documentNo: '',
    description: '',
    dateEntry: new Date(),
    countryId: 0,
    dateExpiry: new Date(),
    dateRenewal: new Date(),
    isActive: false,
    fileName: '',
    fileSize: 0,
    image: '',
    imageType: '',
    country: undefined,
});

export const newWorkVisa = (tempIds?: number[]): PersonnelWorkVisa => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    personnelId: 0,
    documentNo: '',
    dateIssued: new Date(),
    dateEntry: new Date(),
    countryId: 0,
    dateExpiry: new Date(),
    dateRenewal: new Date(),
    isActive: false,
    fileName: '',
    fileSize: 0,
    image: '',
    imageType: '',
    remarks: '',
    country: undefined,
});

export const newBankAccount = (tempIds?: number[]): PersonnelBankAccount => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    personnelId: 0,
    accountHolderName: '',
    bankName: '',
    bankAddress: '',
    accountNumber: '',
    accountType: '',
    iban: '',
    swiftCode: '',
    countryId: 0,
    effectivityDate: new Date(),
    isPrimaryAccount: false,
    country: undefined,
});

export const newPersonnelAddress = (tempIds?: number[]): PersonnelAddress => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    personnelId: 0,
    address: '',
    city: '',
    countryId: 0,
    zipCode: '',
    country: undefined,
});

export const newPersonnelWorkOtherClearance = (tempIds?: number[]): PersonnelWorkOtherClearance => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    personnelId: 0,
    documentName: '',
    documentNo: '',
    dateIssued: new Date(),
    countryId: 0,
    dateExpiry: new Date(),
    fileName: '',
    fileSize: 0,
    image: '',
    imageType: '',
    remarks: '',
    isActive: false,
    country: undefined,
});

export const newPersonnelImageAttachment = (tempIds?: number[]): PersonnelImageAttachment => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    personnelId: 0,
    fileName: '',
    fileSize: 0,
    image: '',
    imageType: '',
    remarks: '',
    orientation: '',
    dateUploaded: new Date(),
    isPrintable: false,
    isDefault: false
});

export const newPersonnelDocumentAttachment = (tempIds?: number[]): PersonnelDocumentAttachment => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    personnelId: 0,
    fileName: '',
    fileSize: 0,
    image: '',
    imageType: '',
    remarks: '',
    action: '',
    dateUploaded: new Date(),
});


export const personnelShape = {
    assignedIdNo: yup.string().required('Assigned ID No. is required!'), 
    firstName: yup.string().required('First Name is required!'),
    lastName: yup.string().required('Last Name is required!'), 
    humanResourceCategoryId: yup.number().min(1, 'Sub-Category is required!'), 
    humanResourceGroupId: yup.number().min(1, 'Group is required.').required(),
    projectId: yup.number().min(1, 'Project Name is required.').required(),
    humanResourcePositionId: yup.number().min(1, 'Position is required.').required(),
    gender: yup.string().required('Gender is required.').required(),
    nationalityId: yup.number().min(1, 'Nationality is required.').required(),
    projectSiteId: yup.number().min(1, 'Project Site Location is required.').required(),
    assignedEmail: yup.string().required('Assigned Email is required.').required(),
    contactNo: yup.string().required('Contact No. is required.').required(),
    jobCodeId: yup.number().min(1, 'Job Code is required.').required(),
    humanResourceDepartmentId: yup.number().min(1, 'Department is required.').required(),
    chatId: yup.string().required('Assigned Chat Id is required.').required(),
    citizenship: yup.string().required('Citizenship Id is required.').required(),
    
    // humanResourceStatusId: yup.number().min(1, 'Status is required.').required(),
    // skillLevelId: yup.number().min(1, 'Skill Level is required.').required(),
    // personnelNo: yup.string().required('Personnel Number is required!'),
}
