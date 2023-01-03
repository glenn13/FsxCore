import GroupUser from './GroupUser';
import {StandardEntry} from '../../StandardEntry';

export default interface Group extends StandardEntry {
  groupUsers?: GroupUser[];
}
