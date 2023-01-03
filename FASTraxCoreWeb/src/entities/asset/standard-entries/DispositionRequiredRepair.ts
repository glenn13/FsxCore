import * as yup from 'yup';

export interface DispositionRequiredRepair {
  id: number;
  name: string;
  assetTypeId: number;
  assetCategoryId: number;
  assetType?: AssetType;
}

export const newDispositionRequiredRepair = (): DispositionRequiredRepair => ({
  id: 0,
  name: '',
  assetTypeId: 0,
  assetCategoryId: 0
});

export const dispositionRequiredRepairShape = {
  name: yup.string().required('Disposition Required Repair Name is required'),
  assetTypeId: yup.number().min(1, 'Asset Type is required'),
};

export { DispositionRequiredRepair as default };