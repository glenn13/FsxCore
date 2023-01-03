import React from 'react';

import GridToolbarCounter, {counterColors} from '@app/components/common/GridToolbarCounter';
import GridToolbar, {ViewOptionTypes} from '@app/components/common/GridToolbar';
import GridToolbarItem from '@app/components/common/GridToolbar/GridToolbarItem';

export interface EstimateViewOptionProps {}

const EstimateViewOption: React.FC<EstimateViewOptionProps> = () => {
  const [viewOption, setViewOption] = React.useState<keyof ViewOptionTypes>();

  return (
    <GridToolbar
      options={['Summary', 'PerRecord']}
      defaultView="Summary"
      onViewOptionsChange={e => setViewOption(e.value)}>
      <GridToolbarItem.Right>
        <GridToolbarCounter
          className="mr-4"
          title="Outstanding"
          color={counterColors.portage}
          value={0}
        />
        <GridToolbarCounter
          className="mr-4"
          title="For Approval"
          color={counterColors.glacier}
          value={0}
        />
        <GridToolbarCounter
          title="Awaiting Technician/Parts"
          color={counterColors.chardonnay}
          value={0}
        />
      </GridToolbarItem.Right>
    </GridToolbar>
  );
};

export default React.memo(EstimateViewOption);
