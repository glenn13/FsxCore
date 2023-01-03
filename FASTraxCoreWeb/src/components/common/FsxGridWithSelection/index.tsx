import React, {useEffect, useState, PropsWithChildren} from 'react';
import {
  Grid,
  GridColumn,
  GridProps,
  GridRowClickEvent,
  GridPageChangeEvent,
} from '@progress/kendo-react-grid';
import {Checkbox, CheckboxChangeEvent} from '@progress/kendo-react-inputs';
import {process} from '@progress/kendo-data-query';
import _ from 'lodash';
import {UUIDToArray} from '@app/utils/uuid.util';

type FsxGridProps<T = {id: number | string} & unknown> = {
  data?: Array<T>;
  children?: React.ReactNode;
  className?: string;
  options?: any;
  filters?: any;
  onGridSelectionDataChanged?: (e: Array<T>) => void;
  onItemCheckedChanged?: (e: Array<T>) => void;
  checkSelection?: boolean;
  gridRef?: React.RefObject<any>;
};

export type BaseUUIDType = {
  id: number | string;
  uuid?: string;
  checked?: boolean;
  isDirty?: string;
  selected?: boolean;
};

export interface KGridProps {
  result: any;
  dataState: any;
}

export const Index: <T extends BaseUUIDType & unknown>(
  childrenProps: PropsWithChildren<FsxGridProps<T> & GridProps>,
) => React.ReactElement = ({data, options, checkSelection = true, gridRef, ...props}) => {
  const [headerCheckAll, setHeaderCheckAll] = React.useState<boolean | null>(false);
  const [paging, setPaging] = useState<KGridProps | undefined>();
  const [selected, setSelected] = React.useState();
  const [gridOptions, setGridOptions] = React.useState<any>({
    skip: props.skip || 0,
    take: 15,
    ...options,
  });

  const createAppState = React.useCallback(
    (dataList: any, dataState: any) => {
      return {
        result: process(dataList, dataState),
        dataState: dataState,
      };

      /* eslint-disable react-hooks/exhaustive-deps */
    },
    [setSelected],
  );

  const newData: any = React.useMemo(() => {
    if (!data) return [];

    const _data = !_.hasIn(data[0], 'uuid') ? UUIDToArray(data) : data;
    setPaging(createAppState(_data, gridOptions));
    return _data;
  }, [data, gridOptions]);

  useEffect(() => {
    if (!newData) return;

    recheckAllCheckItem();
  }, [newData]);

  useEffect(() => {
    if (props.filters) setGridOptions({...gridOptions, skip: 0, take: 15});
    else setGridOptions({...gridOptions, skip: props.skip || options.skip || 0, take: 15});
  }, [props.skip, props.filters]);

  // check all [checked] Property of all item
  const recheckAllCheckItem = () => {
    if (!newData) return;

    const itemSelected = newData.filter((item: any) => item.checked === true);
    const checkStatus =
      itemSelected.length === 0 ? false : newData.length === itemSelected.length ? true : null;

    // for state of column header checkbox
    setHeaderCheckAll(checkStatus);
  };

  /*******************************************************************************/

  // Group Row Item Checkbox OnChange Event
  const groupRowCheckboxOnChange = (event: CheckboxChangeEvent, dataItem: any) => {
    if (!newData) return;

    const checked = event.syntheticEvent.currentTarget.checked;
    const value = dataItem.value;

    // check based on group row item header field value
    const mappedData = newData.map((item: any) => {
      if (_.get(item, dataItem.field) === value) item.checked = checked;
      return item;
    });

    setPaging(createAppState(mappedData, gridOptions));
    recheckAllCheckItem();

    props.onGridSelectionDataChanged && props.onGridSelectionDataChanged(newData);

    props.onItemCheckedChanged &&
      props.onItemCheckedChanged(
        mappedData.filter((item: any) => _.get(item, dataItem.field) === value),
      );
  };

  // Sets Checkbox on Grid Grouped Header to checked or not
  const checkGroupRowCheckboxState = (dataItem: any): boolean | null => {
    const flattenItems: Array<any> = [];
    for (let i = 0, count = dataItem.items.length; i < count; i++) {
      if (dataItem.items[i].items) {
        flattenItems.push(...dataItem.items[i].items);
      } else flattenItems.push(dataItem.items[i]);
    }

    const childSelecteds = flattenItems.filter((item: any) => item.checked === true);

    return childSelecteds.length === 0
      ? false
      : flattenItems.length === childSelecteds.length
      ? true
      : null;
  };

  // Group Row Item Template with Checkbox
  const groupRowTemplate = (td: any, props: any) => {
    if (td && td.props.children && props.rowType === 'groupHeader' && checkSelection) {
      let children = (
        <span className="flex flex-row items-center">
          <Checkbox
            checked={checkGroupRowCheckboxState(props.dataItem)}
            onChange={e => groupRowCheckboxOnChange(e, props.dataItem)}
          />
          <span className="cellRender ml-3">
            <button
              className={props.expanded ? 'k-i-collapse k-icon' : 'k-i-expand k-icon'}
              onClick={e => {
                e.preventDefault();
                if (props.onChange) {
                  props.onChange({
                    dataItem: props.dataItem,
                    syntheticEvent: e,
                    field: undefined,
                    value: !props.expanded,
                  });
                }
              }}
            />
            {props.dataItem.value} : ({props.dataItem.items.length})
          </span>
        </span>
      );
      return React.cloneElement(td, td.props, children);
    }
    return td;
  };

  /*******************************************************************************/

  // Column Header Checkbox OnChange Event
  const columnHeaderCheckboxOnChange = (event: CheckboxChangeEvent, field: string) => {
    const checked = event.syntheticEvent.currentTarget.checked;

    if (!newData) return;

    setHeaderCheckAll(checked);
    const mappedData = newData.map((item: any) => ({...item, [field]: checked}));
    setPaging(createAppState(mappedData, gridOptions));

    props.onGridSelectionDataChanged && props.onGridSelectionDataChanged(mappedData);
  };

  // Column Header Checkbox Template
  const columnHeaderCheckboxTemplate = (props: any) => {
    return (
      <div className="w-full text-center">
        <Checkbox
          value={headerCheckAll}
          onChange={e => columnHeaderCheckboxOnChange(e, props.field)}
        />
      </div>
    );
  };

  /*******************************************************************************/

  // Row Item Checkbox OnChange Event
  const cellItemCheckboxOnChange = React.useCallback(
    (event: CheckboxChangeEvent, dataItem: any) => {
      if (!newData) return;

      const checked = event.syntheticEvent.currentTarget.checked;

      const mappedData = newData.map((item: any) => {
        if (item.uuid === dataItem.uuid) item.checked = checked;
        return item;
      });

      setPaging(createAppState(mappedData, gridOptions));
      recheckAllCheckItem();

      props.onGridSelectionDataChanged && props.onGridSelectionDataChanged(newData);

      props.onItemCheckedChanged && props.onItemCheckedChanged([{...dataItem, checked: checked}]);
    },
    [newData],
  );

  // Row Item Checkbox Template
  const cellItemCheckboxTemplate = (props: any) => {
    if (props.rowType === 'groupHeader') return <></>;

    return (
      <td className="k-group-cell" role="presentation">
        <Checkbox
          value={props.dataItem.checked}
          onChange={e => cellItemCheckboxOnChange(e, props.dataItem)}
        />
      </td>
    );
  };

  /********************************************************************************/

  const expandChange = (event: any) => {
    if (!paging) return;

    event.dataItem[event.target.props.expandField] = event.value;

    setPaging({
      result: Object.assign({}, paging.result),
      dataState: paging.dataState,
    });
  };

  const handleRowClick = (e: GridRowClickEvent) => {
    if (!e.dataItem.uuid) return;
    if (!newData) return;

    setSelected(e.dataItem.uuid);

    const mappedData = newData.map((item: any) => ({
      ...item,
      selected: item.uuid === e.dataItem.uuid,
    }));

    setPaging(createAppState(mappedData, gridOptions));
    props.onRowClick && props.onRowClick(e);
  };

  /********************************************************************************/

  const dataStateChange = (event: any) => {
    setPaging(createAppState(data, event.dataState));
  };

  const handlePageChange = (e: GridPageChangeEvent) => {
    setGridOptions({...gridOptions, skip: e.page.skip, take: e.page.take});
  };
  return (
    <div className="flex flex-col h-full">
      {paging && paging.result && (
        <Grid
          {...props}
          ref={gridRef}
          data={paging.result}
          reorderable={true}
          resizable
          sortable={true}
          className="h-full"
          selectedField="selected"
          cellRender={groupRowTemplate}
          expandField="expanded"
          onExpandChange={expandChange}
          onDataStateChange={dataStateChange}
          onPageChange={handlePageChange}
          {...paging.dataState}
          onRowClick={handleRowClick}
          {...gridOptions}>
          {newData.length > 0 && checkSelection && (
            <GridColumn
              field="checked"
              width="50px"
              headerCell={columnHeaderCheckboxTemplate}
              cell={cellItemCheckboxTemplate}
            />
          )}
          {props.children}
        </Grid>
      )}
    </div>
  );
};

export default React.memo(Index);
