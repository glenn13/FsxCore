export interface TypeOfFault {
  id: number;
  description: string;
}

export const newTypeOfFault = (): TypeOfFault => ({
  id: 0,
  description: '',
});

export {TypeOfFault as default};
