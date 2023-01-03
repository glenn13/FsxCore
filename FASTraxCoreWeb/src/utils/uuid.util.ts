import {v4 as uuidv4} from 'uuid';

export type BaseUUIDType = {
  id: number | string;
  uuid?: string;
  checked?: boolean;
  isDirty?: string;
};

export const UUID = () => uuidv4();

export function UUIDToArray<T extends BaseUUIDType & unknown>(items: Array<T>): any {
  return items.map((item: T) => ({...item, uuid: UUID()}));
}
