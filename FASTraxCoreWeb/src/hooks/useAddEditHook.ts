import {useMutation, queryCache} from 'react-query';
import axios, {} from 'axios';

const useAddEditFn = <T extends {id: number} & unknown>(uri: string, key: string) => {
  const createFunc = async (values: T) => await axios.post(uri, values).then(res => res.data);
  const editFunc = async (values: T) => await axios.patch(uri, values).then(res => res.data);

  return useMutation(
    async (values: T) => {
      if (values.id > 0) return editFunc(values);
      else return createFunc(values);
    },
    {
      onMutate: newOrEditedValue => {
        // const queryCacheValue = queryCache.getQueryData<AxiosResponse<Array<T>>>(key);
        // if (!queryCacheValue) return;
        // const cachedValue = [...queryCacheValue.data];
        // if (newOrEditedValue.id === 0) queryCache.setQueryData(key, {data: [...cachedValue, newOrEditedValue]});
        // else {
        //   const index = cachedValue.findIndex(eachValue => eachValue.id === newOrEditedValue.id);
        //   if (index !== -1) {
        //     cachedValue[index] = {
        //       ...cachedValue[index],
        //       ...newOrEditedValue,
        //     };
        //     queryCache.setQueryData(key, {data: cachedValue});
        //   }
        // }
      },

      onError: (error, newOrEditedValue, rollback: any) => {
        console.error('error ', error);
      },

      onSuccess: () => {},

      onSettled: (data, error, newOrEditedValue) => {
        if (error) return;

        if (newOrEditedValue.id == 0)
          queryCache.setQueryData(key, (prev: any) => ({
            data: [...prev.data, data],
          }));
        else
          queryCache.setQueryData(key, (prev: any) => {
            return {data: [...prev.data.filter((eachValue: T) => eachValue.id !== newOrEditedValue.id), data]};
          });
      },
    },
  );
};

export default useAddEditFn;
