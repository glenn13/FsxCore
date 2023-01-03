import * as yup from 'yup';

export interface CustomField {
    id: number;
    accessModuleId?: number;
    formPageId: number;
    name: string;
    customFieldTypeId: number;
    isRequired: boolean;
    isVisible: boolean;
    isActive: boolean;
}
  
  export const newCustomField = (): CustomField => ({
    id: 0,
    accessModuleId: 0,
    formPageId: 0,
    name: '',
    customFieldTypeId: 0,
    isRequired: false,
    isVisible: false,
    isActive: false,
  });
  
  export const customFieldShape = {
    formPageId: yup.number().min(1, 'Form Page is required'),
    name: yup.string().required('Custom Field Name is required'),
    customFieldTypeId: yup.number().min(1, 'Custom Field Type is required'),
  };
  
  export { CustomField as default };