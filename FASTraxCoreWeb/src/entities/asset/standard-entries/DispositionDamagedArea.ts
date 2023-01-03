import * as yup from 'yup';

export interface DispositionDamagedArea {
  id: number;
  name: string;
  assetTypeId: number;
  assetCategoryId: number;
  assetType?: AssetType;
}

export const newDispositionDamagedArea = (): DispositionDamagedArea => ({
  id: 0,
  name: '',
  assetTypeId: 0,
  assetCategoryId: 0
});

export const dispositionDamagedAreaShape = {
  name: yup.string().required('Disposition Damaged Area Name is required'),
  assetTypeId: yup.number().min(1, 'Asset Type is required'),
};

export { DispositionDamagedArea as default };