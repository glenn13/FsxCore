export interface NumberKeyValuePair<T> {
  [key: number]: T;
}

export interface StringKeyValuePair<T> {
  [key: string]: T;
}

export interface StandardEntryURI {
  all: string;
  find: (id: UrlParam) => string;
}

export interface GridColumn {
  field: string;
  title: string;
  width?: string | number;
  type?: 'checkbox' | 'date' | 'year' | 'default' | 'byteToKb' | 'badge';
  format?: string;
  template?: React.ReactNode;
}

export interface PromiseHandler<ResultType = void, ErrorType = string> {
  result?: ResultType;
  error?: ErrorType;
}

export const generateStringKeyFromIds = (...ids: number[]) => ids.join('_');

export const getTypeSafePropertyAsString = <T>(property: keyof T) => property;

export const convertType = <T>(obj: any): T => {
  return obj as T;
};

export const isValidArrayChildren = (children: React.ReactNode[], ...args: React.ReactNode[]) => {
  const _children: any[] = children;

  const isValidChildren = _children.every((child: any) => {
    if (!child) return true;

    if (Array.isArray(child)) return isValidArrayChildren(child, ...args);

    const isValid = args.some(type => child.type === type);

    if (!isValid) throw new Error(`Invalid Component: ${child.type}`);

    return isValid;
  });

  if (isValidChildren) return true;

  return false;
};

export const isValidChildren = (children: React.ReactNode, ...args: React.ReactNode[]) => {
  const _children: any = children;

  if (!children) return true;

  if (!Array.isArray(_children)) return args.some(type => _children.type === type);

  return isValidArrayChildren(_children, ...args);
};
