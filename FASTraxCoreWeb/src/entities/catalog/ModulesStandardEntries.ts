import {StandardEntry} from '../StandardEntry';

// export interface ModulesStandardEntries extends StandardEntry {}


export interface ModulesStandardEntries {
    id: number;
    code?: string;
    title: string;
    description?: string;
    modulesId: number;
  }
  

// export const newModulesStandardEntries = (): ModulesStandardEntries => ({
//     id : 0,
//     code : '',
//     title : '',
//     description : '', 
//     modulesId?: 0, 
// });

export { ModulesStandardEntries as default }