export interface CommodityModel {
  id: number;
  commodityBrandId: number;
  nonSparePartModel: string;
}

export const newCommodityModel = (): CommodityModel => ({
  id: 0,
  commodityBrandId: 0,
  nonSparePartModel: '',
});

export { CommodityModel as default };