import {FsxAssetCardProps} from '../FsxAssetCard';
import {get} from 'lodash';

type KeyValuePair = {key: string; label?: string};

interface MapOptions {
  /**
   * Id key.
   */
  id?: string;
  /**
   * Header key.
   */
  header?: KeyValuePair;
  /**
   * Contents keys.
   */
  contents?: KeyValuePair[];
  /**
   * Badge key.
   */
  badge?: KeyValuePair;
  /**
   * Image key.
   */
  image?: KeyValuePair;
}

/**
 * Function utility for mapping objects to cards data.
 * @param data any array of objects.
 * @param options options for mapping keys
 */
function mapDataToCardData(data: any[], options?: MapOptions): FsxAssetCardProps[] {
  const mappedData: FsxAssetCardProps[] = data.map(data => {
    return {
      id: get(data, options?.id || ''),
      header: {value: get(data, options?.header?.key || ''), label: options?.header?.label},
      contents: options?.contents?.map(content => ({
        value: get(data, content.key),
        label: content.label,
      })),
      badge: {value: get(data, options?.badge?.key || ''), label: options?.badge?.label},
      imageUrl: get(data, options?.image?.key || ''),
    };
  });

  return mappedData;
}

export default mapDataToCardData;
