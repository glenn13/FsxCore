import {StandardEntry} from './../../StandardEntry';

export interface CreditTerm extends StandardEntry {}

export const newCreditTerm = (): CreditTerm => ({
    id : 0,
    code : '',
    title : '',
    description : ''
});

export { CreditTerm as default }