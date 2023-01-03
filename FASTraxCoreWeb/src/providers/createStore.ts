import create, {SetState, GetState, StoreApi, StateCreator, State} from 'zustand';
import {produce} from 'immer';

export type Middleware<T extends State> = (
  config: StateCreator<T, (fn: (state: T) => void) => void>,
) => (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => T;

export const createStore = <T extends State>(
  storeName: string,
  fn: StateCreator<T, (fn: (state: T) => void) => void>,
) => {
  const immerMiddleWare: Middleware<T> = config => (set, get, api) =>
    config((fn: any) => set(produce(fn) as (state: T) => T), get, api);
  // config(
  //   setArgs => {
  //     // Do stuff here when setting
  //     set(setArgs);
  //   },
  //   () => {
  //     // Do stuff here when getting
  //     return get();
  //   },
  //   {
  //     ...api,
  //     // Add custom api functions here, though I had
  //     // trouble getting passing a custom StateApi type here
  //   },
  // );

  return create(immerMiddleWare(fn));
};
