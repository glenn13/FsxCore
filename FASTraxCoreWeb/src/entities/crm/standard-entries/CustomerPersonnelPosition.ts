import {StandardEntry} from './../../StandardEntry';

export interface CustomerPersonnelPosition extends StandardEntry {}

export const newCustomerPersonnelPosition = (): CustomerPersonnelPosition => ({
    id : 0,
    code : '',
    title : '',
    description : ''
});

export { CustomerPersonnelPosition as default }