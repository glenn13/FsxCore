import { StandardEntry } from '../../StandardEntry';

export interface AssetUnit extends StandardEntry { }

export const newAssetUnit = (): AssetUnit => ({
    id: 0,
    code: '',
    title: '',
    description: '',
});
