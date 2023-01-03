import React from 'react';
import {GridColumn, GridColumnProps} from '@progress/kendo-react-grid';
import KGridMenuFilter from '../../../plugins/KGridMenuFilter';

interface IFsxGridColumnProps extends GridColumnProps {}

export const Index: React.SFC<IFsxGridColumnProps> = ({columnMenu, ...restProps}) => {
  return <GridColumn {...restProps} columnMenu={KGridMenuFilter} />;
};

export default Index;
