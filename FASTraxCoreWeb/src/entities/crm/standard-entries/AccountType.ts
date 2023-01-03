import {StandardEntry} from '../../StandardEntry';

export interface AccountType extends StandardEntry {}

export const newAccountType = (): AccountType => ({
    id : 0,
    code : '',
    title : '', 
    description : ''
});

export { AccountType as default };
 