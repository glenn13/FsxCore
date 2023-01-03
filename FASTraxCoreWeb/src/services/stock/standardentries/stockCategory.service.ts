import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { StockCategory } from '@app/entities/stock/standard-entries/StockCategory';

export const KEY = generateUUID();

export const getStockCategories = async (): Promise<AxiosResponse<StockCategory[]>> => {
  return await http.get(FsxUri.stock.SE.stockCategory.all);
};

export const useStockCategories = () => {
  const result = useQuery(KEY, getStockCategories);

  return result;
};
