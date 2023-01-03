import {
  DropDownList,
  DropDownListFilterChangeEvent,
  DropDownListProps,
} from '@progress/kendo-react-dropdowns';
import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';

import React from 'react';
import {filterBy} from '@progress/kendo-data-query';

export type FsxDropdownListProps = DropDownListProps &
  FsxInputWrapperProps & {width?: string | number};

const FsxDropDownList: React.VFC<FsxDropdownListProps> = ({
  className,
  error,
  label,
  required,
  width,
  ...props
}) => {
  const [filter, setFilter] = React.useState<any>();
  const [state, setState] = React.useState({
    text: '',
  });

  const data = React.useMemo(() => {
    return props.filterable && filter && props.data ? filterBy(props.data, filter) : props.data;
  }, [filter, props.data, props.filterable]);

  const handleFilterOnChange = (event: DropDownListFilterChangeEvent) => {
    setFilter(event.filter);
    setState({text: event.filter.value});
  };

  const handleOnClose = () => {
    setFilter(undefined);
    setState({text: ''});
  };

  return (
    <FsxInputWrapper
      className={className}
      label={label}
      error={error || props.validationMessage}
      required={required}>
      <DropDownList
        {...props}
        style={{width: `${width ? width : '100%'}`}}
        onFilterChange={handleFilterOnChange}
        data={data}
        onClose={handleOnClose}
        filter={state.text}
      />
    </FsxInputWrapper>
  );
};

export default React.memo(FsxDropDownList);
