import {Loader} from '@app/components/common';
import {ExcelExport, ExcelExportColumnProps} from '@progress/kendo-react-excel-export';
import _ from 'lodash';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {GridColumn} from '../../../helpers/types';

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface IExcelExportProps {
  fileName: string;
  data: any;
  columns: GridColumn[];
}

const FsxExcelExport = React.forwardRef<
  ExcelExport | null,
  IExcelExportProps & React.HtmlHTMLAttributes<HTMLDivElement>
>(({children, columns, ...props}, ref) => {
  const [loading, setLoading] = React.useState(false);

  const exportRef = useRef<ExcelExport>(null);

  React.useEffect(() => {
    if (ref && typeof ref === 'function') {
    } else if (ref) {
      ref.current = _.extend(exportRef.current, {
        exportAsExcel: () => {
          setLoading(true);
          exportRef.current?.save();
        },
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const excelColumns: ExcelExportColumnProps[] = React.useMemo(() => {
    if (!columns) return [];
    return columns.map(col => ({field: col.field, title: col.title}));
  }, [columns]);

  const handleExportToExcel = () => setLoading(false);

  return (
    <>
      <ExcelExport
        fileName={props.fileName}
        data={props.data}
        onExportComplete={handleExportToExcel}
        columns={excelColumns}
        ref={exportRef}>
        {children}
      </ExcelExport>
      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
});

export default FsxExcelExport;
