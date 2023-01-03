import {StandardEntry} from './../StandardEntry';
import {ModulesStandardEntries} from './ModulesStandardEntries';

export interface Modules extends StandardEntry {standardEntries: ModulesStandardEntries[]}

export const newModules = (): Modules => ({
    id : 0,
    code : '',
    title : '',
    description : '',
    standardEntries : []
});

export { Modules as default }