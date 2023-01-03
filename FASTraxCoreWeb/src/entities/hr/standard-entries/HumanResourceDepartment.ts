import {StandardEntry} from '../../StandardEntry';

export default interface HumanResourceDepartment extends StandardEntry {}

export const newHumanResourceDepartment = (): HumanResourceDepartment => ({
    id: 0,
    code: '',
    title: '',
    description: '',
});