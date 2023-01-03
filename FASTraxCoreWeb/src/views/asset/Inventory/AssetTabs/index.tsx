import React from 'react';
import {TabStrip, TabStripTab} from '@progress/kendo-react-layout';
import VehicleHistory from './History';
import VehicleTracking from './Tracking';
import AssetIssuances from './Issuances';
import CustomFields from './CustomFields';
import AssetRegistration from './Registration';
import AssetSpecification from './Specification';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export interface AssetTabsProps {
  assetId?: number;
    referenceId?: number;
    categoryId: AssetCategoryEnum;
}

const AssetTabs: React.FC<AssetTabsProps> = ({assetId, categoryId, referenceId}) => {
  const [selected, setSelected] = React.useState(0);

  return (
    <TabStrip
      className="flex flex-1 shadow-lg my-4"
      selected={selected}
          onSelect={e => setSelected(e.selected)}>
          {(categoryId === AssetCategoryEnum.Vehicle ||
              (categoryId === AssetCategoryEnum.GeneralAsset && referenceId)) && (
        <TabStripTab title="Specification">
          <AssetSpecification
            isEdit={!!referenceId}
            referenceId={referenceId}
            categoryId={categoryId}
          />
        </TabStripTab>
      )}
      <TabStripTab title="Registration">
        <AssetRegistration />
      </TabStripTab>
      {referenceId && (
        <TabStripTab title="Pending Issuance">
          <AssetIssuances />
        </TabStripTab>
      )}
      {referenceId && (
        <TabStripTab title="Transaction & History">
          <VehicleHistory />
        </TabStripTab>
          )}
          {referenceId && categoryId === AssetCategoryEnum.Vehicle && (
        <TabStripTab title="Tracking">
          <VehicleTracking vehicleId={assetId || 0} />
        </TabStripTab>
      )}
      <TabStripTab title="Custom Field & Attachments">
        <CustomFields />
      </TabStripTab>
    </TabStrip>
  );
};

export default React.memo(AssetTabs);
