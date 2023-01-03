import React, {useState} from 'react';
import {filterBy, process} from '@progress/kendo-data-query';

import {useGridStore} from '@app/providers/grid.store';

export interface KGridProps {
  result: any;
  dataState: any;
}

// this needs refactoring - remove comments to enable warnings
export function useKendoGrid(data: any, kendoInitialFilter: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {pager, setPager} = useGridStore();
  const createAppState = (dataState: any) => {
    return {
      result: process(data, dataState),
      dataState: dataState,
    };
  };

  const [filter, setFilter] = useState<any>();

  const [paging, setPaging] = useState<KGridProps>(createAppState(kendoInitialFilter));

  /* eslint-disable react-hooks/exhaustive-deps */
  const dataStateChange = (event: any) => {
    setPaging(createAppState(event.dataState));

    setPager({
      skip: event.dataState.skip,
      take: event.dataState.take,
      pageTotal: process(data, event.dataState).total,
    });
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const expandChange = (event: any) => {
    event.dataItem[event.target.props.expandField] = event.value;
    setPaging({
      result: Object.assign({}, paging.result),
      dataState: paging.dataState,
    });
  };

  const paginateGrid = (state: any) => {
    setPaging({
      result: process(data, {...paging.dataState, ...state}),
      dataState: {...paging.dataState, ...state},
    });
  };

  const filterGrid = (filter: any) => {
    const filteredData = filterBy(data, filter);

    setFilter(filter);

    setPaging({
      result: process(filteredData, {...paging.dataState, filter: filter}),
      dataState: {...paging.dataState, filter: filter},
    });

    setPager({
      skip: paging.dataState.skip,
      take: paging.dataState.take,
      pageTotal: filteredData.length,
    });
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const filterChange = (event: any) => filterGrid(event.filter);

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleGridRefresh = (data: any) => {
    setPaging({
      result: process(data, paging.dataState),
      dataState: paging.dataState,
    });
  };

  return React.useMemo(() => {
    return {
      data,
      paging,
      dataStateChange,
      expandChange,
      filterChange,
      handleGridRefresh,
      filterGrid,
      paginateGrid,
      filter,
    };
  }, [
    data,
    paging,
    dataStateChange,
    expandChange,
    filterChange,
    handleGridRefresh,
    filterGrid,
    paginateGrid,
    filter,
  ]);
}
