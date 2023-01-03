import {AxiosResponse} from 'axios';
import {QueryResult} from 'react-query';
import {createAxiosResponse} from './utils';
import {newGeneralAssetGroup} from '@app/entities/asset/inventory/GeneralAssetGroup';
import {GeneralAsset, newGeneralAsset} from '../../../entities/asset/inventory/GeneralAsset';

export const mockGeneralAssetsQuery = (): QueryResult<AxiosResponse<GeneralAsset[]>> =>
  ({data: {data: [newGeneralAsset()]}} as QueryResult<AxiosResponse<GeneralAsset[]>>);

export const mockGeneralAssetsGroups = () =>
  createAxiosResponse([newGeneralAssetGroup(), newGeneralAssetGroup(), newGeneralAssetGroup()]);

export const mockGeneralAssets = (): GeneralAsset[] => [newGeneralAsset(), newGeneralAsset()];
