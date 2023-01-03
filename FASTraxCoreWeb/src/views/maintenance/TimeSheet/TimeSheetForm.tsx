import {GridColumn as Column, Grid, GridCellProps} from '@progress/kendo-react-grid';
import {Form, Formik, FormikConfig} from 'formik';
import {
  FsxButton,
  FsxCheckbox,
  FsxDrawer,
  FsxDropDownList,
  FsxNumericTextBox,
  FsxTextArea,
  FsxTimePicker,
} from '@app/components/common';
import {
  FsxFormikDropDownList,
  FsxFormikInput,
  FsxFormikRadialNewItemMenu,
} from '@app/components/common/FsxFormik';
import {
  GridRowClickEvent,
  GridRowDoubleClickEvent,
} from '@progress/kendo-react-grid/dist/npm/interfaces/events';
import React, {useState} from 'react';
import {filter, find} from 'lodash';

import {ActionWrapperStyled} from '@app/components/common/FsxTable/Actions';
import FsxDatePicker from '@app/components/common/FsxDatePicker';
import FsxInput from '@app/components/common/FsxInput';
import FsxTableAction from '@app/components/common/FsxTable/Action';
import Personnel from '@app/entities/hr/Personnel';
import {UUID} from '@app/utils/uuid.util';
import moment from 'moment';
import produce from 'immer';
import {usePersonnels} from '@app/services/hr/personnel.services';
import {useStatus} from '@app/services/hr/standardentries/status.service';

const TimeSheetForm = (
  props: FormikConfig<TimesheetPersonnelMaintenance> & {editMode?: boolean},
) => {
  /* -------------------------------------------------------------------------- */
  /*                                 Form States                                */
  /* -------------------------------------------------------------------------- */

  //* Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  //* Personnels
  const {data: personnelRes, isLoading: fetchingPersonnels} = usePersonnels();

  //* Selected Personnel
  const [personnel, setPersonnel] = useState<Personnel>(props.initialValues.personnel);

  //* Personnel Status
  const {data: personnelStatusRes, isLoading: fetchingPersonnelStatus} = useStatus();

  //* Selected Personnel
  const [rowSelected, setRowSelected] = useState<string | number>();

  //* Timesheet Form
  const [timesheetForm, setTimesheetForm] = useState<Partial<
    Timesheet & {timesheetPersonnelMaintenanceId?: number}
  > | null>();

  //* Timesheet Form reference id
  const referenceId = React.useMemo(() => UUID(), []);

  /* -------------------------------------------------------------------------- */
  /*                                    Grid                                    */
  /* -------------------------------------------------------------------------- */

  //* Checkbox cell
  const CheckboxCell = (cell: GridCellProps) => (
    <td className="k-command-cell">
      <FsxCheckbox
        readOnly
        withFormWrapper={false}
        checked={cell.dataItem[cell.field || ''] ? cell.dataItem[cell.field || ''] : false}
        value={cell.dataItem[cell.field || ''] ? cell.dataItem[cell.field || ''] : false}
      />
    </td>
  );

  //* Handle row click
  const handleOnRowClick = (event: GridRowClickEvent) => {
    setRowSelected(event.dataItem.id);
  };

  //* Handle row double click
  const handleOnRowDoubleClick = (event: GridRowDoubleClickEvent) => {
    const item = event.dataItem;
    delete item.status;
    delete item.confirmedByPersonnel;
    setTimesheetForm(item);
    setIsDrawerOpen(true);
  };

  //* Handle edit button on click
  const editHandleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: Timesheet[],
  ) => {
    setTimesheetForm(find(data, {id: rowSelected}));
    setIsDrawerOpen(true);
  };

  //* Handle all the title of status
  const personnelStatusTitleList = personnelStatusRes?.data.map(timesheet => timesheet.title);

  //* Handle all the full name of the
  const personnelFullNameList = personnelRes?.data.map(personnel => personnel.fullName);

  const gridDataWithSelector = (data: Timesheet[]) =>
    data.map(timesheet => ({
      ...timesheet,
      selected: timesheet.id === rowSelected,
      status: personnelStatusTitleList?.[timesheet.statusId - 1],
      confirmedByPersonnel: personnelFullNameList?.[timesheet.confirmedByPersonnelId - 1],
    }));

  /* -------------------------------------------------------------------------- */
  /*                                   Drawer                                   */
  /* -------------------------------------------------------------------------- */

  //* update timesheet form
  const updateTimesheetForm = <T extends keyof Timesheet>(key: T, value: Timesheet[T]) =>
    setTimesheetForm(prevState => ({...prevState, [key]: value}));

  //* Handle drawer on close
  const handleDrawerOnClose = () => {
    setIsDrawerOpen(!isDrawerOpen);

    setRowSelected('');
    setTimeout(() => {
      setTimesheetForm(null);
    }, 300);
  };

  return (
    <Formik {...props} initialValues={props.initialValues}>
      {({values, setFieldValue}) => (
        <Form className="h-full">
          <FsxFormikRadialNewItemMenu />
          <div className="flex flex-col h-full">
            <div className={`flex flex-col lg:flex-row mb-4 flex-shrink`}>
              <div
                className="p-4 mb-4 bg-white rounded shadow-lg lg:order-last lg:mb-0"
                style={{width: '350px'}}></div>
              <div className="flex flex-col flex-1 md:mr-4">
                <div className="flex-1 p-4 mb-4 bg-white rounded shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
                    <FsxFormikDropDownList
                      className="md:col-span-2"
                      label="Personnel Name:"
                      name="personnelId"
                      dataItemKey="id"
                      textField="fullName"
                      data={personnelRes?.data}
                      loading={fetchingPersonnels}
                      onChange={event => {
                        setPersonnel(event.value);
                      }}
                      filterable
                      required
                      disabled={props.editMode}
                    />
                    <FsxFormikInput
                      label="Reference No :"
                      name="referenceNo"
                      type="text"
                      readOnly
                      value={referenceId.toUpperCase()}
                      required
                    />
                    <FsxInput
                      label="Status:"
                      name="Status"
                      readOnly
                      value={personnel?.humanResourceStatus?.title || ''}
                    />
                    <FsxInput
                      label="Personnel ID No.:"
                      name="personnelId"
                      readOnly
                      value={personnel?.personnelNo || ''}
                    />
                    <FsxInput
                      label="Assigned ID No.:"
                      name="assignedId"
                      readOnly
                      value={personnel?.assignedIdNo || ''}
                    />
                    <FsxInput
                      label="Position:"
                      name="position"
                      readOnly
                      value={personnel?.humanResourcePosition?.title || ''}
                    />
                    <FsxInput
                      label="Contact No.:"
                      name="contactNumber"
                      readOnly
                      value={personnel?.contactNo || ''}
                    />
                    <FsxInput
                      label="Group:"
                      name="group"
                      readOnly
                      value={personnel?.humanResourceGroup?.title || ''}
                    />
                    <FsxInput
                      label="Skill Level:"
                      name="skillLevel"
                      readOnly
                      value={personnel?.skillLevel?.title || ''}
                    />
                    <FsxInput
                      label="Job Code:"
                      name="jobCode"
                      readOnly
                      value={personnel?.jobCode?.title || ''}
                    />
                    <FsxInput
                      label="Department:"
                      name="department"
                      value={personnel?.humanResourceDepartment?.title || ''}
                      readOnly
                    />
                  </div>
                </div>
                <div className="grid flex-1 grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded shadow-lg col-span-full lg:col-span-1">
                    <div className="mb-3 text-gray-600 uppercase">Selected Date Range</div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <FsxDropDownList label="Range Type:" />
                      <FsxDatePicker
                        className="row-start-2"
                        label="Date From:"
                        formatPlaceholder="wide"
                      />
                      <FsxDatePicker
                        className="row-start-2"
                        label="Date To:"
                        formatPlaceholder="wide"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded shadow-lg col-span-full lg:col-span-2">
                    <div className="mb-3 text-gray-600 uppercase">Timesheet Totals</div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <FsxInput label="Total Hours Rendered:" name="totalHoursRendered" readOnly />
                      <FsxInput label="Total Rendered Hours:" name="totalRenderedHours" readOnly />
                      <FsxInput label="Total Approved Hours:" name="totalApprovedHours" readOnly />
                      <FsxInput label="Hourly Rate:" name="hourlyRate" readOnly />
                      <FsxInput
                        label="Total Acquired Labour Cost:"
                        name="totalAcquiredLabourCost"
                        readOnly
                      />
                      <FsxInput
                        label="Total Approved Labour Cost:"
                        name="totalApprovedLabourCost"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-grow h-full p-4 bg-white rounded shadow-lg">
              <Grid
                className="flex-grow py-3"
                selectedField="selected"
                data={gridDataWithSelector(values?.timesheets || [])}
                onRowClick={handleOnRowClick}
                onRowDoubleClick={handleOnRowDoubleClick}>
                <Column field="selected" width="36px" />
                <Column field="datePerformed" title="Date Performed" />
                <Column field="workOrderNo" title="Work Order No" />
                <Column field="serviceCode" title="SRO/Service Code" />
                <Column field="estimatedTime" title="Estimated Time" />
                <Column field="clockIn" title="Clock In" />
                <Column field="clockOut" title="Clock Out" />
                <Column field="actualHour" title="Actual Hour" />
                <Column field="totalCost" title="Total Cost" />
                <Column field="reWork" title="Re-Work" cell={CheckboxCell} />
                <Column field="ojt" title="OJT" cell={CheckboxCell} />
                <Column field="status" title="Status" />
                <Column field="confirmedByPersonnel" title="confirmed By" />
                <Column field="remarks" title="Remarks" />
              </Grid>
              <ActionWrapperStyled>
                <FsxTableAction
                  label={'Add'}
                  onClick={() => setIsDrawerOpen(true)}
                  disabled={!values.personnelId}
                />
                <FsxTableAction
                  label={'Edit'}
                  onClick={event => editHandleOnClick(event, values?.timesheets || [])}
                  disabled={!values.personnelId || !rowSelected}
                />
                <FsxTableAction
                  label={'Delete'}
                  onClick={() => {
                    setFieldValue(
                      'timesheets',
                      filter(values?.timesheets || [], timesheet => timesheet.id !== rowSelected),
                    );
                    setRowSelected('');
                  }}
                  disabled={!values.personnelId || !rowSelected}
                />
                <FsxTableAction
                  label={'Approve'}
                  onClick={() => console.log('Delete')}
                  disabled={!values.personnelId || !rowSelected}
                />
                <FsxTableAction
                  label={'Decline'}
                  onClick={() => console.log('Delete')}
                  disabled={!values.personnelId || !rowSelected}
                />
              </ActionWrapperStyled>
            </div>
          </div>
          <FsxDrawer title="Time Sheet" isOpen={isDrawerOpen} onClose={handleDrawerOnClose}>
            <div className="w-full">
              <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
                <FsxDropDownList
                  label="Work Order No."
                  onChange={event => event.value && updateTimesheetForm('workOrderId', event.value)}
                  value={timesheetForm?.workOrderId}
                />
                <FsxDropDownList
                  bg-gray-100
                  label="SRO / Service Code"
                  onChange={event => event.value && updateTimesheetForm('serviceCode', event.value)}
                  value={timesheetForm?.serviceCode}
                />
                <FsxDatePicker
                  className="col-span-full"
                  label="Date Performed:"
                  formatPlaceholder="wide"
                  onChange={event =>
                    event.value && updateTimesheetForm('datePerformed', event.value)
                  }
                  value={timesheetForm?.datePerformed || null}
                />
                <FsxTimePicker
                  label="Clock In"
                  onChange={event => event.value && updateTimesheetForm('clockIn', event.value)}
                  value={timesheetForm?.clockIn || null}
                  disabled={timesheetForm?.datePerformed === undefined}
                  min={timesheetForm?.datePerformed}
                />
                <FsxTimePicker
                  label="Clock Out"
                  onChange={event => event.value && updateTimesheetForm('clockOut', event.value)}
                  value={timesheetForm?.clockOut || null}
                  disabled={timesheetForm?.clockIn === undefined}
                  min={timesheetForm?.clockIn}
                  validationMessage={
                    moment(timesheetForm?.clockOut).diff(timesheetForm?.clockIn, 'minute') < 0
                      ? 'Invalid clock out time'
                      : ''
                  }
                />
                <FsxNumericTextBox
                  label="Estimated Time"
                  format="n2"
                  onChange={event =>
                    event.value && updateTimesheetForm('estimatedTime', event.value)
                  }
                  value={timesheetForm?.estimatedTime || null}
                />
                <FsxNumericTextBox
                  label="Actual Hour"
                  format="n2"
                  onChange={event => event.value && updateTimesheetForm('actualHour', event.value)}
                  value={timesheetForm?.actualHour || null}
                />
                <FsxNumericTextBox
                  label="Total Cost"
                  format={{style: 'currency', currency: 'USD'}}
                  onChange={event => event.value && updateTimesheetForm('totalCost', event.value)}
                  value={timesheetForm?.totalCost || null}
                />
                <FsxCheckbox
                  className="col-start-1"
                  label="Re-work"
                  onChange={event => updateTimesheetForm('reWork', event.value)}
                  value={timesheetForm?.reWork ? timesheetForm?.reWork : false}
                  checked={timesheetForm?.reWork ? timesheetForm?.reWork : false}
                />
                <FsxCheckbox
                  label="OJT"
                  onChange={event => updateTimesheetForm('ojt', event.value)}
                  value={timesheetForm?.ojt ? timesheetForm?.ojt : false}
                  checked={timesheetForm?.ojt ? timesheetForm?.ojt : false}
                />
                <FsxDropDownList
                  label="Status"
                  textField="title"
                  name="statusId"
                  data={personnelStatusRes?.data}
                  loading={fetchingPersonnelStatus}
                  dataItemKey="id"
                  onChange={event =>
                    event.value && updateTimesheetForm('statusId', event.value?.id)
                  }
                  value={find(personnelStatusRes?.data, {id: timesheetForm?.statusId})}
                />
                <FsxDropDownList
                  label="Confirmed By"
                  textField="fullName"
                  name="confirmedByPersonnelId"
                  dataItemKey="id"
                  data={personnelRes?.data}
                  onChange={event =>
                    event.value && updateTimesheetForm('confirmedByPersonnelId', event.value?.id)
                  }
                  value={find(personnelRes?.data, {id: timesheetForm?.confirmedByPersonnelId})}
                />
                <FsxTextArea
                  className="col-span-full"
                  label="Remarks"
                  rows={4}
                  onChange={event =>
                    event.value &&
                    updateTimesheetForm(
                      'remarks',
                      typeof event.value === 'string' ? event.value : undefined,
                    )
                  }
                  value={timesheetForm?.remarks || ''}
                />
                <FsxButton
                  className="shadow col-span-full"
                  shape="rounded-full"
                  primary
                  type="button"
                  onClick={() => {
                    if (timesheetForm) {
                      timesheetForm.id
                        ? setFieldValue(
                            'timesheets',
                            produce(values.timesheets, draftValues => {
                              if (draftValues) {
                                const index = draftValues.findIndex(
                                  timesheet => timesheet.id === rowSelected,
                                );
                                if (index !== -1) draftValues[index] = timesheetForm as Timesheet;
                              }
                            }),
                          )
                        : setFieldValue(
                            'timesheets',
                            produce(values.timesheets, draftValues => {
                              if (!timesheetForm.id)
                                timesheetForm.id = `timesheet-temp-id_${UUID()}`;
                              if (props.initialValues.id)
                                timesheetForm.timesheetPersonnelMaintenanceId =
                                  props.initialValues.id;
                              draftValues?.push(timesheetForm as Timesheet);
                            }),
                          );
                      handleDrawerOnClose();
                    }
                  }}
                  disabled={
                    !timesheetForm?.datePerformed ||
                    !timesheetForm.clockIn ||
                    !timesheetForm.clockOut ||
                    !timesheetForm.estimatedTime ||
                    !timesheetForm.actualHour ||
                    !timesheetForm.totalCost ||
                    !timesheetForm.statusId ||
                    !timesheetForm.confirmedByPersonnelId ||
                    moment(timesheetForm?.clockOut).diff(timesheetForm?.clockIn, 'minute') < 0
                  }>
                  {timesheetForm?.id ? 'Update' : 'Add'}
                </FsxButton>
                <FsxButton
                  className="shadow col-span-full"
                  shape="rounded-full"
                  type="button"
                  onClick={handleDrawerOnClose}>
                  Cancel
                </FsxButton>
              </div>
            </div>
          </FsxDrawer>
        </Form>
      )} 
    </Formik>
  );
};

export default TimeSheetForm;
