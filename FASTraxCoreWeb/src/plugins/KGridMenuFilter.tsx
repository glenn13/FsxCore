import {
     GridColumnMenuProps,
     GridColumnMenuFilter
} from '@progress/kendo-react-grid';
import React from 'react';

interface IProps {}

class KGridMenuFilter extends React.Component<GridColumnMenuProps> {
     render() {
          return (
               <GridColumnMenuFilter {...this.props} hideSecondFilter={true} />
          );
     }
}

export default KGridMenuFilter;
