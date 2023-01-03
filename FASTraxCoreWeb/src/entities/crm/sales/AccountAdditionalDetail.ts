import Industry from './Industry';
import AccountType from '../standard-entries/AccountType';
import AccountGroup from '../standard-entries/AccountGroup';

export default interface AdditionalDetail {
  id: number;
  accountId: number;
  industryId: number | null;
  accountGroupId: number | null;
  accountTypeId: number | null;
  dateRegistered: Date | null;

  industry?: Industry;
  accountType?: AccountType;
  accountGroup?: AccountGroup;
}

export const emptyAdditionalDetail = (): AdditionalDetail => ({
  id: 0,
  accountId: 0,
  industryId: 0,
  accountGroupId: 0,
  accountTypeId: 0,
  dateRegistered: new Date(),
});
