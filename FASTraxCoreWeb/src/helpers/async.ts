export interface WrappedResponse<R, E = any> {
  error?: E;
  result?: R;
}

export type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T;

export const wrap = <R = any, E = any>(
  func: () => Promise<R>,
): Promise<Unwrap<WrappedResponse<R, E>>> => {
  return new Promise(resolve => {
    func()
      .then(result => resolve({result}))
      .catch(error => resolve({error}));
  });
};

export const wrapPromise = <R = any, E = any>(
  func: Promise<R>,
): Promise<Unwrap<WrappedResponse<R, E>>> => {
  return new Promise(resolve => {
    func.then(result => resolve({result})).catch(error => resolve({error}));
  });
};

export default {
  wrap,
};
