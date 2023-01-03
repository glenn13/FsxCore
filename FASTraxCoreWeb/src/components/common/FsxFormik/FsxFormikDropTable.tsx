import React, {InputHTMLAttributes, useEffect} from 'react';
import {useField, useFormikContext} from 'formik';
import styled from 'styled-components';
import styles from './FsxFormik.module.scss';
import {FsxGridWithSelection} from '@app/components/common';
import FsxInputWrapper from '../FsxInputWrapper';
import DropdownContainer from '@app/components/common/ButtonDropdown/DropdownContainer';
import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import {GridColumn} from '@app/helpers/types';
import _ from 'lodash';
import {useDebounce} from '@app/hooks/useDebounce';
import {filterBy} from '@progress/kendo-data-query';
import {Input} from '@progress/kendo-react-inputs';
import clx from 'classnames';

export interface FsxFormikDropTableProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  outlined?: boolean;
  icon?: boolean;
  iconName?: string;
  shadow?: boolean;
  rounded?: boolean;
  containerClassName?: string;
  data?: any;
  dataItemKey: string;
  textField: string;
  isLoading: boolean;
  columns?: GridColumn[];
  options?: any;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  onDataSelectChange?: (e: any) => void;
}

const StyledButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.08);
  outline: none;
  padding: 10px 16px 7px 16px !important;
  line-height: 1.5;
  font-size: 10pt;
  width: 100%;
  font-weight: 300;
  border-color: rgba(0, 0, 0, 0.15);
  background: white;
  border-radius: 5px;
  visibility: visible;
  text-align: left;
  min-height: 40px;

  &.k-state-invalid {
    border-color: rgba(243, 23, 0, 0.5);
  }

  .k-select .k-icon {
    color: #858a90;
  }
`;

const StyledDiv = styled.div`
  position: relative;
`;

const InputStyled = styled.input`
  border: none;
  outline: none;
  padding: 12px 16px 7px 16px !important;
  line-height: 1.5;
  font-size: 10pt;
  width: 100%;
  font-weight: 300;
  border-radius: 5px;
`;

export const FsxFormikDropTable = React.forwardRef<HTMLInputElement, FsxFormikDropTableProps>(
  (
    {
      containerClassName,
      className,
      width,
      required,
      data,
      dataItemKey,
      textField,
      isLoading,
      position = 'bottom-left',
      ...props
    },
    ref,
  ) => {
    const [field, meta] = useField(props.name);
    const {setFieldValue} = useFormikContext();
    const refDiv = React.useRef<HTMLDivElement | null>(null);
    const [gridSelected, setGridSelected] = React.useState<any>();
    const [inputVal, setInputVal] = React.useState<string>('');
    const [setDebouncedState] = useDebounce(inputVal, (prop: any) => applyFilter(prop), 500);
    const gridRef = React.useRef<Grid>(null);
    const [filters, setFilters] = React.useState<any>();
    const [gridData, setGridData] = React.useState<any>();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [gridSkip, setGridSkip] = React.useState(0);
    const refParent = React.useRef<any>();

    const handleOnInput = (event: any) => {
      setInputVal(event.target.value);
      setDebouncedState(event.target.value);
    };

    const applyFilter = (str: string) => {
      if (!gridRef.current) return;
      if (!str) {
        setFilters(undefined);
        return;
      }

      const columns = gridRef.current.columns;
      const filterCols: any = [];
      // iterate column fields
      _.forEach(columns, (column: any) => {
        filterCols.push({
          field: column.field,
          operator: 'contains',
          value: str,
        });
      });

      setFilters({
        filters: filterCols,
        logic: 'or',
      });

      setGridSkip(0);
    };

    const handleClickOutside = (event: Event) => {
      if (
        (refDiv.current &&
          !refDiv.current.contains(event.target as Node) &&
          refDiv.current?.parentElement?.classList[0] !==
            (event.target as HTMLElement).parentElement?.classList[0]) ||
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);

      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };

      /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    useEffect(() => {
      if (data) {
      }
    }, [data]);

    const getData = React.useCallback(
      (selectedValue: number | string): any => {
        return (
          dataItemKey &&
          data &&
          filterBy(
            data.map((d: any, indx: number) => {
              return {...d, selected: d[dataItemKey] === selectedValue};
            }),
            filters,
          )
        );
      },
      [data, filters, setFilters],
    );

    const selectedItem = React.useMemo(() => {
      if (!gridRef.current) return;

      const _value = (gridSelected && gridSelected[dataItemKey]) || field.value;
      const _take = gridRef.current.props.take || 15;

      return (
        dataItemKey &&
        data &&
        data.filter((d: any, indx: number) => {
          if (d[dataItemKey] === _value) {
            const curPage = Math.ceil((indx + 1) / _take);
            const skip = _take * (curPage - 1);
            setGridSkip(skip);
          }
          return d[dataItemKey] === _value;
        })[0]
      );
    }, [field.value, data, gridSelected, filters, isOpen]);

    const handleSelectChange = (e: any) => {
      setGridSelected(e.dataItem);
      setFieldValue(field.name, e.dataItem[dataItemKey]);
      setIsOpen(false);
      setFilters(undefined);
      setInputVal('');

      props.onDataSelectChange && props.onDataSelectChange(e);
    };

    const LoadingComponent = (
      <div className={`${styles.fsxFormikDropTableLoading} k-loading-mask`}>
        <div className={`${styles.fsxFormikDropTableLoadingImage} k-loading-image`}></div>
        <div className="k-loading-color"></div>
      </div>
    );

    const DropdownIconComponent = (
      <span className="k-select">
        <span className="k-icon k-i-arrow-s"></span>
      </span>
    );

    const checkBoxFieldColumn = (props: any) => {
      const fieldValue = props.dataItem[props.field];

      return (
        <td colSpan={props.colSpan} style={props.style}>
          <input type="checkbox" checked={fieldValue} readOnly={true} />
        </td>
      );
    };

    const generateColumns = React.useCallback((): React.ReactNode | React.ReactNode[] => {
      return (
        props.columns &&
        props.columns.map(({field, title, type, width}: any, i) =>
          type !== 'checkbox' ? (
            <Column key={i} field={field} title={title} width={width || '100%'} />
          ) : (
            <Column
              key={i}
              field={field}
              title={title}
              width={width || '100%'}
              cell={checkBoxFieldColumn}
            />
          ),
        )
      );
    }, [props.columns]);

    React.useEffect(() => {
      if (!data) return;

      setGridData(getData((gridSelected && gridSelected[dataItemKey]) || field.value));
    }, [data, dataItemKey, field.value, filters]);

    const isValid = meta.touched ? !meta.error : true;

    return (
      <FsxInputWrapper
        label={props.label}
        className={className}
        error={meta.touched ? meta.error : undefined}
        required={required}>
        <div className={'flex flex-col flex-1'}>
          <StyledDiv>
            <StyledButton
              type="button"
              className={clx({
                'k-state-invalid': !isValid,
              })}
              style={{width: width}}
              onClick={() => setIsOpen(!isOpen)}
              ref={refParent}>
              <Input {...field} type="hidden" />
              <div className="flex flex-row">
                <div className="flex-grow">
                  <label>{textField && _.get(selectedItem, textField)}</label>
                </div>
                <div className="flex-shrink">
                  {isLoading ? LoadingComponent : DropdownIconComponent}
                </div>
              </div>
            </StyledButton>
            <DropdownContainer
              ref={refDiv}
              isOpen={isOpen}
              position={position}
              parentRef={refParent}>
              <div>
                <div>
                  <InputStyled
                    ref={inputRef}
                    placeholder="Search..."
                    value={inputVal}
                    onChange={handleOnInput}
                  />
                </div>
                <FsxGridWithSelection
                  gridRef={gridRef}
                  data={gridData || data}
                  options={{skip: gridSkip}}
                  checkSelection={false}
                  pageable={true}
                  onRowDoubleClick={handleSelectChange}
                  filters={filters}
                  {...{skip: gridSkip}}>
                  {generateColumns()}
                </FsxGridWithSelection>
              </div>
            </DropdownContainer>
          </StyledDiv>
        </div>
      </FsxInputWrapper>
    );
  },
);

export default React.memo(FsxFormikDropTable);
