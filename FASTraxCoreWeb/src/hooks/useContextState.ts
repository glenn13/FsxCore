import * as React from 'react';

export interface ContextStateProps<T> {
  initialValues: T;
}

export interface ContextState<T> {
  context: T;
  setContext: (context: T) => void;
}

export function createContextStateInitialValue<T>(initialValues: T): ContextState<T> {
  return {context: initialValues, setContext: () => {}};
}

export function useContextState<T = any>({initialValues}: ContextStateProps<T>) {
  const [data, setData] = React.useState<T>(() => initialValues);
  const [context, setContext] = React.useState<ContextState<T>>({
    context: data,
    setContext: setData,
  });

  React.useEffect(() => {
    setContext({context: data, setContext: setData});
  }, [data]);

  return React.useMemo(() => {
    return context;
  }, [context]);
}
