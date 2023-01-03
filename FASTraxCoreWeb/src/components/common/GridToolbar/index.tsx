import {FsxDropDownList} from '..';
import GridToolbarItem from './GridToolbarItem';
import React from 'react';
import _ from 'lodash';
import style from './grid-toolbar.module.scss';

export type ViewOptionTypes = typeof ViewOptions;

export interface DropdownValueProps {
  value: keyof ViewOptionTypes;
  label: string;
}

export const ViewOptions = {
  Search: 'By Search',
  Summary: 'By Summary',
  PerRecord: 'Per Record',
};

export interface GridSummaryToolbarProps<T> {
  options?: Array<keyof ViewOptionTypes>;
  defaultView?: keyof ViewOptionTypes;
  className?: string;
  onViewOptionsChange?: (value: DropdownValueProps) => void;
}

/**
 * A custom toolbar for grid with view toggle option
 */
const GridToolbar: React.FC<GridSummaryToolbarProps<ViewOptionTypes>> = ({
  className,
  children,
  options,
  defaultView,
  onViewOptionsChange,
  ...rest
}) => {
  /**
   ** This should align to the typeof `viewOptionTypes`
   */

  const [selected, setSelected] = React.useState(() => ({
    value: defaultView || 'Summary',
    label: _.get(ViewOptions, defaultView || ViewOptions.Summary),
  }));

  const getValues = React.useCallback(
    (viewOptions?: Array<keyof ViewOptionTypes>) => {
      return (
        viewOptions &&
        _.keys(ViewOptions)
          .filter(o => viewOptions.some(v => v === o))
          .map(m => ({value: m, label: _.get(ViewOptions, m)}))
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options],
  );

  const findAndLoadElement = React.useCallback(
    (element: React.ReactNode, elementProps?: Object) => {
      const childElement = React.Children.toArray(children).find(
        (child: any) => child?.type === element,
      );

      if (React.isValidElement(childElement) && elementProps)
        return React.cloneElement(childElement, elementProps);

      return childElement;
    },
    [children],
  );

  React.useEffect(() => {
    if (!onViewOptionsChange) return;

    onViewOptionsChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelected, selected]);

  return (
    <div className={`${style.container} card-box p-4 ${className}`}>
      <div className="flex flex-col items-start w-full lg:items-end lg:flex-row">
        <FsxDropDownList
          className={`${style.dropdown} mb-3 lg:mb-0`}
          id="viewOptionDropdown"
          data={getValues(options)}
          textField="label"
          dataItemKey="value"
          label="View Option"
          value={selected}
          onChange={e => setSelected(e.value)}
        />
        <div className="flex mb-3 ml-0 lg:ml-4 lg:mb-0">
          {findAndLoadElement(GridToolbarItem.Left)}
        </div>
        <div className="grid w-full grid-cols-2 gap-3 lg:w-auto md:grid-cols-3 lg:ml-auto lg:flex lg:flex-row">
          {findAndLoadElement(GridToolbarItem.Right)}
        </div>
      </div>
    </div>
  );
};

export default GridToolbar;
