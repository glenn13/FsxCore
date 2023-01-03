import Account from './Account';
import AccountAddressType from '../../global/AddressType';
import {Address} from '../../global/Address';

export default interface AccountAddress {
  id: number;
  accountId: number;
  addressId: number;
  accountAddressTypeId: number;

  account?: Account;
  address?: Address;
  accountAddressType?: AccountAddressType;
}
