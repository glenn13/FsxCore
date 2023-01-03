import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export const getLabelByCategory = (category: AssetCategoryEnum) =>
    category === AssetCategoryEnum.Vehicle ? 'VIN' : 'Serial No.';
