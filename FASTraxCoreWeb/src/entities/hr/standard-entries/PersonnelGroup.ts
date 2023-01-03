import {StandardEntry} from '../../StandardEntry';

export interface PersonnelGroup extends StandardEntry {}

export const newPersonnelGroup = (): PersonnelGroup => ({
    id : 0,
    code : '',
    title : '', 
    description : ''
});

export { PersonnelGroup as default };
