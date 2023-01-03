import {StandardEntry} from '../../StandardEntry';

export interface HumanResourceContractType extends StandardEntry {}

export const newHumanResourceContractType = (): HumanResourceContractType => ({
    id : 0,
    code : '',
    title : '', 
    description : ''
});

export { HumanResourceContractType as default };
