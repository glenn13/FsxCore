import {BaseEntity} from '../../base';

export interface Status extends BaseEntity {
    title: string,
}

export const newStatus = (): Status => ({
    id : 0,
    title : '',
});

export { Status as default }