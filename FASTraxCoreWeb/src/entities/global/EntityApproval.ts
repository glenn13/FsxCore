import {generateNegativeNumber} from '@app/helpers/randoms';
import Approval from './Approval';
import {BaseEntity} from './../base';
import {IReference} from './IReference';

export const newEntityApproval = (approval: Approval, existingIds: number[]): EntityApproval => ({
  id: generateNegativeNumber({flat: existingIds}),
  approvalId: approval.id,
  referenceId: 0,

  approval,
});

export default interface EntityApproval<T = unknown> extends BaseEntity, IReference<T> {
  approvalId: number;

  approval: Approval;
}
