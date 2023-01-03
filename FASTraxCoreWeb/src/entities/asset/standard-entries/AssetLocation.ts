import {StandardEntry} from '../../StandardEntry';

export interface AssetLocation extends StandardEntry {
  parentLocationId?: number;

  parentLocation?: AssetLocation;
}
