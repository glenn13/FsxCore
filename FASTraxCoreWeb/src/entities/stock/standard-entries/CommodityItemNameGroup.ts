
export interface CommodityItemNameGroup {
  id: number;
  commodityItemNameId: number;
  commodityGroupId: number;
  isActive: boolean;
}

export const newCommodityItemNameGroup = (): CommodityItemNameGroup => ({
  id: 0,
  commodityItemNameId: 0,
  commodityGroupId: 0,
  isActive: false,
});

export { CommodityItemNameGroup as default };
