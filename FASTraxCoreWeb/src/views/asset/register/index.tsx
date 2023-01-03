import {Button, ButtonGroup, GridToolbarSearch, Loader, SvgIcon} from '@app/components/common';
import GridToolbar, {DropdownValueProps} from '@app/components/common/GridToolbar';
import GridToolbarCounter, {counterColors} from '@app/components/common/GridToolbarCounter';
import AssetRegisterPerRecord from './index.perrecord';
import AssetRegisterSummary from './index.summary';
import FsxCardGrid from '@app/components/common/FsxCardGrid';
import GridToolbarItem from '@app/components/common/GridToolbar/GridToolbarItem';
import React from 'react';
import {motion} from 'framer-motion';
import {useRegisterSummary} from '@app/services/asset/register/register.service';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import {useHistory} from 'react-router-dom';
import {getUnderMaintenanceCount} from '@app/services/maintenance/workorder.service';

const AssetRegister: React.VFC = () => {
  const history = useHistory();
  const [viewOption, setViewOption] = React.useState<DropdownValueProps>();
  const [isGridView, setIsGridView] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const {isLoading, data: summaryData} = useRegisterSummary();

  const [undermaintenanceCount, setUndermaintenanceCount] = React.useState(0);

  React.useEffect(() => {
    getUnderMaintenanceCount().then(response => setUndermaintenanceCount(response.data));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const handleViewDetails = React.useCallback(
    (value: any) => {
      if (value !== undefined) {
        var _castValue = value as RegisterSummary;
        switch (_castValue.assetCategoryId) {
          case AssetCategoryEnum.Component: {
            history.push(`/app/asset/register/component/${_castValue.id}`);
            break;
          }
          case AssetCategoryEnum.GeneralAsset: {
            history.push(`/app/asset/register/generalasset/${_castValue.id}`);
            break;
          }
          case AssetCategoryEnum.Vehicle: {
            history.push(`/app/asset/register/vehicle/${_castValue.id}`);
            break;
          }
        }
      }
    },
    [history],
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-shrink mb-4">
        <GridToolbar
          options={['Summary', 'PerRecord']}
          defaultView="Summary"
          onViewOptionsChange={(view: DropdownValueProps) => setViewOption(view)}>
          <GridToolbarItem.Left>
            {viewOption?.value === 'PerRecord' && (
              <motion.div initial={{scale: 0.3, opacity: 0}} animate={{scale: 1, opacity: 1}}>
                <GridToolbarSearch onChange={handleSearch} value={filter} />
              </motion.div>
            )}
            {viewOption?.value === 'Summary' && (
              <ButtonGroup className="ml-2">
                <Button
                  transparent
                  ripple
                  className="px-2"
                  data-tooltip-for="viewThumb"
                  data-tooltip-message="Card View"
                  disabled={isGridView}
                  onClick={() => setIsGridView(!isGridView)}>
                  <SvgIcon size={22} color="#4f5761" svgId="thumbnail" style={{margin: '0 auto'}} />
                </Button>
                <Button
                  transparent
                  ripple
                  className="px-2"
                  data-tooltip-for="viewList"
                  data-tooltip-message="List View"
                  disabled={!isGridView}
                  onClick={() => setIsGridView(!isGridView)}>
                  <SvgIcon size={22} color="#4f5761" svgId="list" style={{margin: '0 auto'}} />
                </Button>
              </ButtonGroup>
            )}
          </GridToolbarItem.Left>
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
              value={undermaintenanceCount || 0}
            />
            <GridToolbarCounter
              className="mr-4"
              title="Asset for Collection"
              color={counterColors.glacier}
              value={0}
            />
          </GridToolbarItem.Right>
        </GridToolbar>
      </div>
      <div className="flex-grow">
        {viewOption?.value === 'PerRecord' && <AssetRegisterPerRecord filter={filter} />}
        {viewOption?.value === 'Summary' && (
          <>
            {isGridView && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="h-full pb-6">
                {isLoading ? (
                  <Loader />
                ) : (
                  <FsxCardGrid
                    data={summaryData?.data}
                    id="refId"
                    header={{key: 'assetRefId', label: 'Asset ID'}}
                    contents={[
                      {key: 'assetCategory', label: 'Asset Category'},
                      {key: 'vinSerialNo', label: 'VIN / Serial No.'},
                      {key: 'assetItemName', label: 'Asset Name'},
                      {key: 'assetManufacturer', label: 'Manufacturer'},
                      {key: 'assetModel', label: 'Model'},
                      {key: 'assetType', label: 'Asset Type'},
                      {key: 'maintenanceStatus', label: 'Maintenance Status'},
                    ]}
                    image={{key: 'imageURL'}}
                    badge={{key: 'assetStatus'}}
                    grid={{
                      column: [1, 1, 2],
                      gap: 6,
                    }}
                    onClick={e => console.log('CARD CLICK', e.dataItem)}
                    onViewDetailsClick={e => handleViewDetails(e.dataItem)}
                    contentStyle={{gridColumns: 2, gridRows: 4, gridFlow: 'col'}}
                  />
                )}
              </motion.div>
            )}
            {!isGridView && <AssetRegisterSummary />}
          </>
        )}
      </div>
    </div>
  );
};

export default AssetRegister;
