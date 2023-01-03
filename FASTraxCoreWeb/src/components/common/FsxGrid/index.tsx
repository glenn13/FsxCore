import {FsxInput, LoaderOverlay} from '@app/components/common';
import {Grid, GridProps, GridRowClickEvent} from '@progress/kendo-react-grid';
import React, {useEffect, useRef, useState} from 'react';
import {forEach, debounce as loDebounce} from 'lodash';
import {gridFilterType, recurFilterStr} from './grid.filter';

import {ExcelExport} from '@progress/kendo-react-excel-export';
import styles from './FsxGrid.module.scss';
import {useDebounce} from '@app/hooks/useDebounce';
import {useGridStore} from '@app/providers/grid.store';
import {useKendoGrid} from '../../../hooks/useKendoGrid';
import {useWindowSize} from '@app/hooks/useWindowSize';

export interface FsxGridProps extends GridProps {
  data?: any;
  options?: any;
  gridRef?: any;
  children?: React.ReactNode;
  className?: string;
  gridExcelExportRef?:
    | {
        ref: any;
        fileName?: string;
      }
    | any;
}

export interface FsxGridExcelExportRef {
  excelExport: () => void;
}

const FsxGrid = (props: FsxGridProps, ref?: any) => {
  const windowSize = useWindowSize();
  const flexDivRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<Grid>(null);
  const [selected, setSelected] = React.useState();
  const {pager, setPager, setFooterPagerVisibility} = useGridStore();
  const option = {
    take: 15,
    skip: 0,
    ...props.options,
  };

  const {
    data,
    paging,
    dataStateChange,
    expandChange,
    filterChange,
    handleGridRefresh,
    filterGrid,
    paginateGrid,
    filter,
  } = useKendoGrid(props.data, option);

  const handleRowClick = (e: GridRowClickEvent) => {
    props.onRowClick && props.onRowClick(e);
    setSelected(e.dataItem.id);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (data) handleGridRefresh(data);
  }, [data]);

  const [inputVal, setInputVal] = React.useState<string>('');
  const [filterObj, setFilterObj] = React.useState<gridFilterType[]>();
  const [setDebouncedState] = useDebounce(inputVal, (prop: any) => sendFilter(prop), 500);

  const sendFilter = (str: string) => {
    if (!gridRef.current) return;

    const columns = gridRef.current.columns.filter(e => !!e.field);
    const filterCols: any = [];
    // iterate column fields
    forEach(columns, (column: any) => {
      filterCols.push({
        field: column.field,
        operator: 'contains',
        value: str,
      });
    });

    if (str === '') {
      filterGrid({
        filters: [],
        logic: 'or',
      });
    }

    //calls filterGrid function from hook
    else
      filterGrid({
        filters: filterCols,
        logic: 'or',
      });
  };

  useEffect(() => {
    if (!filter) return;
    if (!gridRef.current) return;
    const columns = gridRef.current.columns.filter(e => !!e.field);

    const filterCriteriaResult = recurFilterStr(filter.filters, columns);
    filterCriteriaResult && setFilterObj(filterCriteriaResult);
  }, [filter]);

  useEffect(() => {
    setFooterPagerVisibility(true);
    setPager({
      skip: option.skip,
      take: option.take,
      pageTotal: paging.result.total,
    });

    return () => setFooterPagerVisibility(false);
  }, []);

  useEffect(() => {
    paginateGrid({skip: pager.skip, take: pager.take});
  }, [pager.skip, pager.take]);

  const handleChange = (event: any) => {
    setInputVal(event.target.value);
    setDebouncedState(event.target.value);
  };

  const handleRemoveFilterItem = (itemFilter: gridFilterType) => {
    filterGrid({
      filters: filterObj && filterObj.filter(e => e.field !== itemFilter.field),
      logic: 'or',
    });
  };

  const debounce = React.useCallback(
    loDebounce(() => {
      if (flexDivRef.current) {
        flexDivRef.current.removeAttribute('style');
        flexDivRef.current.style.width = `${flexDivRef.current?.clientWidth}px`;
      }
    }, 500),
    [],
  );

  React.useEffect(() => {
    debounce();
  }, [windowSize.width, windowSize.height]);

  useEffect(() => {
    //!! Blank if() statement?????
    if (props.gridRef && typeof props.gridRef === 'function') {
    } else if (props.gridRef) {
      props.gridRef.current = gridRef.current;
    }
  }, []);

  const excelExportRef = useRef<ExcelExport>(null);

  React.useImperativeHandle(
    props.gridExcelExportRef?.ref ? props.gridExcelExportRef.ref : props.gridExcelExportRef,
    (): FsxGridExcelExportRef => ({
      excelExport: () => {
        setGeneratingExcelExport(true);
        excelExportRef.current?.save(props.data);
      },
    }),
  );

  const [generatingExcelExport, setGeneratingExcelExport] = useState(false);

  return (
    <div className={`${props.className} flex flex-col relative`} ref={flexDivRef}>
      {generatingExcelExport && <LoaderOverlay text="Generating export file..." />}
      <div className="flex flex-row items-center justify-between bg-white">
        <div style={{width: 270}}>
          <FsxInput
            className="mx-4 my-1 fsx_grid_search_text"
            icon
            iconName="ams-search1"
            value={inputVal}
            onInput={handleChange}
          />
        </div>
        <div className="mr-5">
          <div
            className={
              styles['header-page-records']
            }>{`${paging.result?.data.length} of ${paging.result.total} total record(s)`}</div>
        </div>
      </div>
      <ExcelExport
        onExportComplete={() => setGeneratingExcelExport(false)}
        fileName={props.gridExcelExportRef?.fileName}
        ref={excelExportRef}>
        <Grid
          {...props}
          ref={gridRef}
          reorderable={true}
          resizable
          sortable={true}
          data={{
            data: paging.result.data.map((item: any) => ({
              ...item,
              selected: item.id === selected,
            })),
            total: paging.result.total,
          }}
          selectedField="selected"
          onDataStateChange={dataStateChange}
          {...paging.dataState}
          onExpandChange={expandChange}
          expandField="expanded"
          onFilterChange={e => filterChange(e)}
          onRowClick={handleRowClick}>
          {props.children}
        </Grid>
      </ExcelExport>

      <div className={styles['filter-criteria-part']}>
        {filterObj && filterObj.length > 0 && (
          <div className="px-2 py-2 grid_bottom_filter_wrap">
            {filterObj.map((filter: gridFilterType, indx) => (
              <span key={indx}>
                <i className="ams-cross" onClick={e => handleRemoveFilterItem(filter)}></i>[
                {filter.text}] {filter.operator} {filter.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(FsxGrid);
