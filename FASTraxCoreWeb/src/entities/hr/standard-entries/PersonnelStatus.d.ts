import {BaseEntity} from '../../base';

export interface PersonnelStatus extends BaseEntity {
    title: string,
}

export const newPersonnelStatus = (): PersonnelStatus => ({
    id : 0,
    title : '',
});

export { PersonnelStatus as default }