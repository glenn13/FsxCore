type StorageTypes = 'localStorage' | 'sessionStorage';

const set = <T>(type: StorageTypes, key: string, item: T): void => {
  window[type].setItem(key, JSON.stringify(item));
};

const get = <T>(type: StorageTypes, key: string): T | undefined => {
  let data: any = window[type].getItem(key);

  let obj: T | undefined;

  try {
    obj = <T>JSON.parse(data);
  } catch (error) {
    throw new Error(error.response.data?.error || error.response.data);
  }

  return obj;
};

export default {
  set,
  get,
};
