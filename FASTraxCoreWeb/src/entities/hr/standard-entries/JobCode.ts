import {StandardEntry} from '../../StandardEntry';

export interface JobCode extends StandardEntry {}

export const newJobCode = (): JobCode => ({
    id : 0,
    code : '',
    title : '',
    description : ''
});

export { JobCode as default }