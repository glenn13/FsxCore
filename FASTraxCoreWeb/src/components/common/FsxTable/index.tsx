import React from 'react';
import {FsxTableActionsProps} from './Actions';
import {GridColumn} from '../../../helpers/types';
import {
  Grid,
  GridColumn as Column,
  GridPageChangeEvent,
  GridProps,
  GridRowClickEvent,
} from '@progress/kendo-react-grid';
import {Checkbox, CheckboxChangeEvent} from '@progress/kendo-react-inputs';
import moment from 'moment';
import _ from 'lodash';

export type FsxTableData<T> = T & {
  row__index: number;
};

interface GridClickEvent<T = any> extends GridRowClickEvent {
  dataItem: FsxTableData<T>;
}

export interface FsxTableProps<T = any> extends GridProps {
  children?: React.ReactElement<FsxTableActionsProps>;
  styles?: React.CSSProperties;
  columns?: GridColumn[];
  className?: string;
  dataKey?: string;
  testId?: string;
  data?: T[];
  onRowClick?: (e: GridClickEvent<any>) => void;
}

const INDEX = 'row__index';

const badgeTemplate = [
  {value: "soon due", style: "bg-green-500"},
  {value: "due", style: "bg-yellow-500"},
  {value: "overdue", style: "bg-red-500"},
]

const FsxTable = React.forwardRef(
  <T extends unknown>(
    {
      dataKey = 'id',
      data,
      skip,
      take,
      styles,
      testId,
      columns,
      children,
      className,
      onRowClick,
      ...rest
    }: FsxTableProps<T>,
    ref?: React.Ref<Grid>,
  ) => {
    const [gridSkip, setGridSkip] = React.useState(0);
    const [gridTake, setGridTake] = React.useState(10);
    const [selected, setSelected] = React.useState(-1);

    const checkBoxFieldColumn = (props: any) => {
      const fieldValue = props.dataItem[props.field];

      return (
        <td colSpan={props.colSpan} style={props.style}>
          <Checkbox checked={fieldValue} readOnly={true} />
        </td>
      );
    };

    const dateTimeFieldColumn = (props: any) => {
      const fieldValue = _.get(props.dataItem, props.field);
      return <td>{fieldValue && moment(fieldValue).format('DD-MMM-yyyy hh:mm:Ss a')}</td>;
    };

    const dateFieldColumn = (props: any) => {
      const fieldValue = _.get(props.dataItem, props.field);
      return <td>{fieldValue && moment(fieldValue).format('DD-MMM-yyyy')}</td>;
    };

    const yearFieldColumn = (props: any) => {
      const fieldValue = _.get(props.dataItem, props.field);
      return <td>{fieldValue && moment(fieldValue).format('yyyy')}</td>;
    };

    const byteToKbFieldColumn = (props: any) => {
      const fieldValue = _.get(props.dataItem, props.field);

      const converter = (bytes: any) => {
        if (bytes == 0) return '0';
        let l = 0,
          n = parseInt(bytes, 10) || 0;
        while (n >= 1024 && ++l) {
          n = n / 1024;
        }
        return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + 'KB';
      };

      return <td>{fieldValue && converter(fieldValue)}</td>;
    };

    const badgeFieldColumn = (props: any) => {
      const fieldValue = _.get(props.dataItem, props.field);
      if (fieldValue != null)
      {
        const badgeStyle = `${badgeTemplate.find((b) => b.value === fieldValue.toLowerCase())?.style}`;
        return (
          <td>
            <span className={`m-auto rounded-full px-2 py-1 text-xs uppercase text-white ${badgeStyle}`}>
              {fieldValue}
            </span>
          </td>
        ); 
      }
      else return ( <td><span>&nbsp;</span></td> );  
    };

    const getTypeTemplate = (
      type: 'checkbox' | 'date' | 'datetime' | 'year' | 'default' | 'byteToKb' | 'badge' | undefined,
    ) => {
      switch (type) {
        case 'checkbox':
          return checkBoxFieldColumn;
        case 'date':
          return dateFieldColumn;
        case 'datetime':
          return dateTimeFieldColumn;
        case 'year':
          return yearFieldColumn;
        case 'byteToKb':
          return byteToKbFieldColumn;
        case 'badge':
          return badgeFieldColumn;
        default:
          return undefined;
      }
    };

    const generateColumns = React.useCallback(
      (): React.ReactNode | React.ReactNode[] =>
        columns?.map(({field, title, type, format, width}, i) => (
          <Column
            key={i}
            field={field}
            title={title}
            format={format}
            width={width}
            cell={getTypeTemplate(type)}
          />
        )),
      [columns],
    );

    const handleRowClick = React.useCallback(
      (e: GridClickEvent<FsxTableData<T>>) => {
        setSelected(e.dataItem[INDEX]);

        onRowClick && onRowClick(e);
      },
      [onRowClick],
    );

    React.useEffect(() => {
      if (typeof skip === 'undefined') return;

      setGridSkip(skip);
    }, [skip]);

    React.useEffect(() => {
      if (typeof take === 'undefined') return;

      setGridTake(take);
    }, [take]);

    const handlePageChange = (e: GridPageChangeEvent) => {
      setGridSkip(e.page.skip);
      setGridTake(e.page.take);
    };

    const gridData = React.useMemo(() => {
      const pagedData = data?.slice(gridSkip, gridTake + gridSkip);

      return pagedData?.map((row: any, i) => ({
        ...row,
        [INDEX]: i,
        selected: i === selected,
      }));
    }, [data, gridSkip, gridTake, selected]);

    React.useEffect(() => {
      setSelected(-1);
    }, [data]);

    return (
      <div className={`flex flex-1 flex-col ${className}`} data-testid={testId}>
        <Grid
          {...rest}
          ref={ref}
          style={styles}
          className={className}
          selectedField="selected"
          onRowClick={handleRowClick}
          skip={skip || gridSkip}
          take={take || gridTake}
          total={data?.length || 0}
          pageable={true}
          onPageChange={handlePageChange}
          data={gridData}>
          {generateColumns()}
        </Grid>
        {children}
      </div>
    );
  },
);

export default FsxTable;
