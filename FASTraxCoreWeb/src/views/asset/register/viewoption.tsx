import React from 'react';

import GridToolbarCounter, {counterColors} from '@app/components/common/GridToolbarCounter';
import GridToolbar, {DropdownValueProps} from '@app/components/common/GridToolbar';
import GridToolbarItem from '@app/components/common/GridToolbar/GridToolbarItem';

export interface AssetRegisterViewOptionProps {
  onViewSelectedOptionsChange?: (value: DropdownValueProps) => void;
}

const AssetRegisterViewOption: React.FC<AssetRegisterViewOptionProps> = ({onViewSelectedOptionsChange}) => {
  const handleSelectedOptionsChange = React.useCallback((e: DropdownValueProps) => 
    {
      onViewSelectedOptionsChange && onViewSelectedOptionsChange(e);
    },
    [onViewSelectedOptionsChange],
  );

  return (
    <GridToolbar
      options={['Summary', 'PerRecord']}
      defaultView="PerRecord"
      onViewOptionsChange={e => handleSelectedOptionsChange(e)}>
      <GridToolbarItem.Right>
        <GridToolbarCounter
          className="mr-4"
          title="Asset Availability Count"
          color={counterColors.chardonnay}
          value={0}
        />
        <GridToolbarCounter
          className="mr-4"
          title="Asset for Inspection"
          color={counterColors.pictonBlue}
          value={0}
        />
        <GridToolbarCounter
          className="mr-4"
          title="Asset Due for Service"
          color={counterColors.portage}
          value={0}
        />
        <GridToolbarCounter
          className="mr-4"
          title="Asset Under Maintenance"
          color={counterColors.chardonnay}
          value={0}
        />
        <GridToolbarCounter
          className="mr-4"
          title="Asset for Collection"
          color={counterColors.glacier}
          value={0}
        />
      </GridToolbarItem.Right>
    </GridToolbar>
  );
};

export default React.memo(AssetRegisterViewOption);
