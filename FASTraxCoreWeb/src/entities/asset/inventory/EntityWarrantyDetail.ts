import {BaseEntity} from './../../base';
import WarrantyDetail from './WarrantyDetail';
import {IReference} from './../../global/IReference';

export default interface EntityWarrantyDetail<T = unknown> extends BaseEntity, IReference<T> {
  warrantyDetailId: number;

  warrantyDetail: WarrantyDetail;
}
