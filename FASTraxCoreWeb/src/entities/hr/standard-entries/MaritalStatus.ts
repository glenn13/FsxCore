import {BaseEntity} from '../../base';

export interface MaritalStatus extends BaseEntity {
    title: string,
}

export const newMaritalStatus = (): MaritalStatus => ({
    id : 0,
    title : '',
});

export { MaritalStatus as default }