import {Project} from './Project';

export interface ProjectAssetCategory {
  id: number;
  projectId: number;
  project?: Project;
  assetCategoryId: number;
  assetCategory?: AssetCategory;
}
