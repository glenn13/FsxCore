import {BaseEntity} from '../../base';
import {IReference} from '../../global/IReference';
import RegistrationDetail from './RegistrationDetail';

export default interface EntityRegistrationDetail<T = unknown> extends BaseEntity, IReference<T> {
  registrationDetailId: number;

  registrationDetail: RegistrationDetail;
}
