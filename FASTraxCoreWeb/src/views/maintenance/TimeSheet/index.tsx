import {AnimatePresence, motion} from 'framer-motion';
import {
  Button,
  ButtonGroup,
  FsxGrid,
  GridToolbarSearch,
  Loader,
  SvgIcon,
} from '@app/components/common';
import GridToolbar, {DropdownValueProps} from '@app/components/common/GridToolbar';
import GridToolbarCounter, {counterColors} from '@app/components/common/GridToolbarCounter';

import FsxCardGrid from '@app/components/common/FsxCardGrid';
import {FsxGridExcelExportRef} from '@app/components/common/FsxGrid';
import {GridColumn} from '@progress/kendo-react-grid';
import {GridRowDoubleClickEvent} from '@progress/kendo-react-grid/dist/npm/interfaces/events';
import GridToolbarItem from '@app/components/common/GridToolbar/GridToolbarItem';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import Personnel from '@app/entities/hr/Personnel';
import React from 'react';
import {ReactComponent as SearchListIcon} from '@app/assets/images/search-list.svg';
import sampleData from './timesheetSampleData.json';
import {useHistory} from 'react-router-dom';
import {usePersonnels} from '@app/services/hr/personnel.services';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {useTimesheetPersonnelMaitenanceSummary} from '@app/services/maintenance/timesheetpersonnelmaintenance.service';

export interface TimesheetPersonnelMaintenanceProps {}

const TimeSheetPersonnelMaintenance: React.FC<TimesheetPersonnelMaintenanceProps> = () => {
  const history = useHistory();

  const {data: timesheetPersonnelSummaries, isLoading} = useTimesheetPersonnelMaitenanceSummary();

  const {data: activePersonnels} = usePersonnels();

  const [personnel, setPersonnel] = React.useState<Personnel[]>();

  const [rowSelected, setRowSelected] = React.useState('');

  React.useEffect(() => {
    if (activePersonnels?.data) setPersonnel(activePersonnels.data);
  }, [activePersonnels]);

  const handleRowDoubleClick = (event: GridRowDoubleClickEvent) => {
    const timesheetPersonnelMaintenanceId = event.dataItem.id;
    history.push(`/app/maintenance/timesheet/${timesheetPersonnelMaintenanceId}`);
  };

  const radialMenu = useRadialMenu({rerenderDelayMS: 100});

  const handleUpdate = () => {
    if (rowSelected) history.push(`/app/maintenance/timesheet/${rowSelected}`);
  };

  const handleDelete = () => console.log('Handle Delete');

  radialMenu.generate([
    {title: 'View', icon: 'visibility-visible'},
    {
      title: 'Create',
      icon: 'add',
      onClick: () => history.push('/app/maintenance/timesheet/new'),
    },
    {title: 'Update', icon: 'edit', onClick: handleUpdate},
    {title: 'Delete', icon: 'trash', onClick: handleDelete},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel', onClick: () => gridExcelExportRef.current?.excelExport()},
  ]);

  const gridExcelExportRef = React.useRef<FsxGridExcelExportRef>();

  const [isGridView, setIsGridView] = React.useState(false);

  const [viewOptions, setViewOptions] = React.useState<DropdownValueProps>();

  const handleOnViewOptionsChange = (view: DropdownValueProps) => {
    setViewOptions(view);
  };

  const [filter, setFilter] = React.useState('');

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink ">
        <GridToolbar
          options={['Summary', 'PerRecord']}
          defaultView="Summary"
          onViewOptionsChange={handleOnViewOptionsChange}>
          <GridToolbarItem.Left>
            {viewOptions?.value === 'PerRecord' && (
              <motion.div initial={{scale: 0.3, opacity: 0}} animate={{scale: 1, opacity: 1}}>
                <GridToolbarSearch
                  onChange={(event: any) => handleSearchOnChange(event)}
                  value={filter}
                />
              </motion.div>
            )}
            {viewOptions?.value === 'Summary' && (
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
              title="Active Personnels"
              color={counterColors.glacier}
              value={
                personnel
                  ? personnel.filter(x => x.humanResourceStatus?.title === 'Active').length
                  : 0
              }
            />
          </GridToolbarItem.Right>
        </GridToolbar>
      </div>
      <div className="flex-grow">
        {isLoading ? (
          <Loader />
        ) : (
          <AnimatePresence>
            {viewOptions?.value === 'PerRecord' && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="h-full ">
                {filter ? (
                  <FsxCardGrid
                    id="timesheetNo"
                    data={sampleData}
                    header={{key: 'timesheetNo', label: 'Timesheet No.'}}
                    contents={[
                      {key: 'personnel.personnelNo', label: 'Personnel No'},
                      {key: 'personnel.fullName', label: 'Full Name'},
                    ]}
                    badge={{key: 'personnel.humanResourceStatus.title'}}
                    disableSearch
                    filter={filter}
                    onFilterOnly
                    grid={{
                      column: [1, 3, 4],
                      gap: 6,
                    }}
                    onClick={e => console.log(e.dataItem)}
                  />
                ) : (
                  <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    className="flex flex-col items-center justify-center w-full h-40 col-span-full">
                    <SearchListIcon className="h-12" />
                    <p className="text-lg">Search per record</p>
                  </motion.div>
                )}
              </motion.div>
            )}
            {viewOptions?.value === 'Summary' && (
              <>
                {isGridView && (
                  <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="h-full pb-6">
                    <FsxCardGrid
                      id="timesheetNo"
                      data={sampleData}
                      header={{key: 'timesheetNo', label: 'Timesheet No.'}}
                      contents={[
                        {key: 'personnel.personnelNo', label: 'Personnel No'},
                        {key: 'personnel.fullName', label: 'Full Name'},
                      ]}
                      badge={{key: 'personnel.humanResourceStatus.title'}}
                      onClick={e => console.log(e.dataItem)}
                    />
                  </motion.div>
                )}
                {!isGridView && (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                    <FsxGrid
                      className="h-full"
                      data={timesheetPersonnelSummaries?.data}
                      onRowDoubleClick={handleRowDoubleClick}
                      onRowClick={e => setRowSelected(e.dataItem.id)}
                      gridExcelExportRef={{ref: gridExcelExportRef, fileName: 'Timesheet Summary'}}>
                      <GridColumn
                        field="personnel.personnelNo"
                        title="Personnel ID No."
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                      />
                      <GridColumn
                        field="personnel.assignedIdNo"
                        title="Assigned ID No."
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                      />
                      <GridColumn
                        field="personnel.fullName"
                        title="Full Name"
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                      />
                      <GridColumn
                        field="personnel.category.title"
                        title="Category"
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                      />
                      <GridColumn
                        field="personnel.humanResourceStatus.title"
                        title="Status"
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                      />
                      <GridColumn
                        field="personnel.nationality.title"
                        title="Nationality"
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                      />
                      <GridColumn
                        field="personnel.humanResourceDepartment.title"
                        title="Department"
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                      />
                      <GridColumn
                        field="personnel.humanResourcePosition.title"
                        title="Position"
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                      />
                    </FsxGrid>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default TimeSheetPersonnelMaintenance;

