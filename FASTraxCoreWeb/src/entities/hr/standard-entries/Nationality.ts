import {BaseEntity} from '../../base';

export interface Nationality extends BaseEntity {
    title: string,
}

export const newNationality = (): Nationality => ({
    id : 0,
    title : '',
});

export { Nationality as default };