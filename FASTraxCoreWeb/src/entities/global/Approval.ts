import {BaseEntity} from './../base';
import {User} from './../catalog/User';
import {generateNegativeNumber} from '@app/helpers/randoms';

export const newApproval = (designatedTo: User, existingIds?: number[]): Approval => ({
  id: generateNegativeNumber({flat: existingIds}),
  designatedToId: designatedTo.id,
  remarks: '',

  designatedTo,
});

export default interface Approval extends BaseEntity {
  remarks: string;
  designatedToId: number;
  actionDateTime?: Date;

  designatedTo?: User;
}
