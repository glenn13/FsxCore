import {BaseEntity} from '../../base';

export interface Category extends BaseEntity{
    title: string,
}

export const newCategory = (): Category => ({
    id : 0,
    title : '',
})

export { Category as default }