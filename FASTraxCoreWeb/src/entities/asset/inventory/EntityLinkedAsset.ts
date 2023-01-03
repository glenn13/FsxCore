import {BaseEntity} from '../../base';
import {IReference} from '../../global/IReference';

export default interface EntityLinkedAsset<T> extends BaseEntity, IReference<T> {
  linkedReferenceId: number;

  linkedReference: T;
}
