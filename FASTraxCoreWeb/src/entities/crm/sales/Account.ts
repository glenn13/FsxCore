import {User} from '../../catalog/User';
import AccountAddress from './AccountAddress';
import AccountAdditionalDetail from './AccountAdditionalDetail';

export default interface Account {
  id: number;
  additionalDetailId: number;
  accountNo: string;
  accountName: string;
  officialWebsite: string;
  emailAddress: string;
  phoneNo: string;
  faxNo: string;
  accountDescription: string;
  assignedToId: number;

  assignedTo?: User;
  additionalDetail?: AccountAdditionalDetail;
  accountAddresses?: AccountAddress[];
}
