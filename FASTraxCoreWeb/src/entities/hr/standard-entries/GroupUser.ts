import {BaseEntity} from './../../base';
import {User} from './../../catalog/User';

export default interface GroupUser extends BaseEntity {
  userId: number;
  groupId: number;

  user?: User;
}
