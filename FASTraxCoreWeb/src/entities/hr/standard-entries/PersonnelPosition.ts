import {BaseEntity} from '../../base';

export interface PersonnelPosition extends BaseEntity {
    title: string,
}

export const newPersonnelPosition = (): PersonnelPosition => ({
    id : 0, 
    title : '', 
});

export { PersonnelPosition as default };