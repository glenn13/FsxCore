import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {FsxGridWithSelection} from '../..';
import {GridColumn} from '@progress/kendo-react-grid';

interface HighChartTableProps {
  slideUp?: boolean;
  chartData?: any;
  columns?: Array<string>;
}

const HighChartTableWrapper = styled.div<Pick<HighChartTableProps, 'slideUp'>>`
  position: absolute;
  left: 0;
  top: ${props => (props.slideUp ? '0' : '100%')};
  height: 100%;
  width: 100%;
  background-color: #fff;
  z-index: 100;
  transition: top 200ms ease-in-out 0s;
`;

interface ColumnGrid {
  field: string;
  title: string;
  width?: string | number;
  type?: 'checkbox' | 'default';
  format?: string;
}

export const HighChartTable: React.FC<HighChartTableProps> = ({
  children,
  slideUp = false,
  columns,
  chartData,
  ...props
}) => {
  const [data, setData] = React.useState();
  const [gridColumns, setGridColumns] = React.useState<ColumnGrid[]>();

  React.useEffect(() => {
    if (!chartData) return;
    let _columns: Array<ColumnGrid> = [];

    if (chartData) {
      const objProp = Object.getOwnPropertyNames(chartData[0]);
      _.each(columns, (value: any, indx: number) => {
        _columns.push({title: value, field: objProp[indx]});
      });

      setGridColumns(_columns);
      setData(chartData);
    }
  }, [chartData]);

  const generateColumns = React.useCallback(
    (): React.ReactNode | React.ReactNode[] =>
      gridColumns?.map(({field, title, type, format}, i) => (
        <GridColumn key={i} field={field} title={title} format={format} />
      )),
    [gridColumns],
  );

  return (
    <HighChartTableWrapper slideUp={slideUp}>
      {data && (
        <FsxGridWithSelection
          data={data}
          style={{height: 500}}
          options={{}}
          checkSelection={false}
          pageable={true}>
          {generateColumns()}
        </FsxGridWithSelection>
      )}
    </HighChartTableWrapper>
  );
};

export default React.memo(HighChartTable);
