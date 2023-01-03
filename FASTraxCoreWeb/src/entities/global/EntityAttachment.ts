import {BaseEntity} from './../base';
import {IReference} from './IReference';
import {IAttachment} from './IAttachment';

export default interface EntityAttachmentDocument<T = unknown>
  extends BaseEntity,
    IAttachment,
    IReference<T> {}
