import filterDeep from 'deepdash-es/filterDeep';

export const findCheckedTreeViewItems = (treeViewItems: any) => {
  let filters: any = [];

  filterDeep(treeViewItems, (value: any, key: any, parent: any) => {
    if ((key === 'checkUnknown' || key === 'checked') && value === true) {
      parent.visible = true;
      filters.push(parent);
    }
  });

  return filters;
};

export const findSelectedOnAggregatedDataFromKendo = (kendoData: any) => {
  let filters: Array<any> = [];

  filterDeep(kendoData, (value: any, key: any, parent: any) => {
    if (key === 'selected' && value === true) {
      filters.push(parent);
    }
  });

  return filters;
};
