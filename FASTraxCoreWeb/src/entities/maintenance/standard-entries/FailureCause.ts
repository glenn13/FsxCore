export interface FailureCause {
  id: number;
  isForECOD: boolean;
  assetCategoryId: number;
  description: string;
}

export const newFailureCause = (): FailureCause => ({
  id: 0,
  isForECOD: false,
  description: '',
  assetCategoryId: 0,
});

export {FailureCause as default};
