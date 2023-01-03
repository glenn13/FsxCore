import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import FsxUri from '@app/helpers/endpoints';
import httpService from '@app/services/http.service';
import { AxiosResponse } from 'axios';
import {useQuery} from 'react-query';

export const REGISTER_SUMMARY_KEY = 'REGISTER_SUMMARY';

export const GetURIAssetPageForNew = (e: AssetCategory): string => {
  let _value: string;
  _value = '';
  switch (e.id) {
    case Number(AssetCategoryEnum.GeneralAsset): {
      _value = '/app/asset/register/generalasset/new';
      break;
    }
    case Number(AssetCategoryEnum.Vehicle): {
      _value = '/app/asset/register/vehicle/new';
      break;
    }
    case Number(AssetCategoryEnum.Component): {
      _value = '/app/asset/register/component/new';
      break;
    }
  }

  return _value;
};

export const getRegisterPerRecord = (searchKey?: string) =>
  httpService.get<RegisterSummary[]>(
    `${FsxUri.assets.registers.perRecord.base}?searchkey=${searchKey}`,
  );

export const getRegisterSummary = () =>
  httpService.get<RegisterSummary[]>(`${FsxUri.assets.registers.summary.base}`);

export const useRegisterSummary = () => useQuery(REGISTER_SUMMARY_KEY, getRegisterSummary);

export const CheckSerialNoIfExistOnNewAsync = async (serialNo: string): Promise<boolean> => {
  const { data } = await CheckSerialNoIfExistOnNew(serialNo);
  return data
}

export const CheckVinIfExistOnNewAsync = async (vin: string): Promise<boolean> => {
  const { data } = await CheckVinIfExistOnNew(vin);
  return data
}

export const CheckSerialNoIfExistOnEditAsync = async (assetCategoryId: number, id: number, serialNo: string): Promise<boolean> => {
  const { data } = await CheckSerialNoIfExistOnEdit(assetCategoryId, id, serialNo);
  return data
}

export const CheckVinIfExistOnEditAsync = async (assetCategoryId: number, id: number, vin: string): Promise<boolean> => {
  const { data } = await CheckVinIfExistOnEdit(assetCategoryId, id, vin);
  return data
}

export const CheckSerialNoIfExistOnNew = (serialNo: string): Promise<AxiosResponse> => {
  return httpService.get<boolean>(`${FsxUri.assets.registers.base}?serialno=${serialNo}`);
};

export const CheckVinIfExistOnNew = (vin: string): Promise<AxiosResponse> => {
  return httpService.get<boolean>(`${FsxUri.assets.registers.base}?vin=${vin}`);
};

export const CheckSerialNoIfExistOnEdit = (assetCategoryId: number, id: number, serialNo: string): Promise<AxiosResponse> => {
  return httpService.get<boolean>(`${FsxUri.assets.registers.base}?assetcategoryid=${assetCategoryId}&id=${id}&serialno=${serialNo}`);
};

export const CheckVinIfExistOnEdit = (assetCategoryId: number, id: number, vin: string): Promise<AxiosResponse> => {
  return httpService.get<boolean>(`${FsxUri.assets.registers.base}?assetcategoryid=${assetCategoryId}&id=${id}&vin=${vin}`);
};

