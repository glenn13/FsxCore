import {StandardEntry} from '../StandardEntry';
import CustomField from './CustomField';

export interface ModuleForm extends StandardEntry {
  customFields?: CustomField[];
}
