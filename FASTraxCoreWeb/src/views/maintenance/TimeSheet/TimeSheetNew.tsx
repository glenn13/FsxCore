import React, {Suspense} from 'react';

import {Confirm} from '@app/components/common/Alert';
import {FormikHelpers} from 'formik';
import FsxUri from '@app/helpers/endpoints';
import {Loader} from '@app/components/common';
import TimeSheetForm from './TimeSheetForm';
import httpService from '@app/services/http.service';
import moment from 'moment';
import {useHistory} from 'react-router-dom';

const TimeSheetNew = () => {
  let history = useHistory();
  const initialFormValues: TimesheetPersonnelMaintenance = {
    timesheets: [],
  };

  const modalSuccess = () => {
    Confirm({
      text: 'Inspection successfully created',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => history.push('/app/maintenance/timesheet'),
    });
  };
  const handleSubmit = async (
    values: typeof initialFormValues,
    _formikHelpers: FormikHelpers<typeof initialFormValues>,
  ) => {
    const regex = /timesheet-temp-id/;
    const payload: TimesheetPersonnelMaintenance = {
      ...values,
      timesheets: values?.timesheets?.map(timesheet => {
        const offset = moment.parseZone().utcOffset();
        return {
          ...timesheet,
          id: timesheet.id
            ? regex.test(timesheet.id?.toString())
              ? 0
              : timesheet.id
            : timesheet.id,
          datePerformed: moment(timesheet.datePerformed).add(offset, 'minutes').toDate(),
          clockIn: moment(timesheet.clockIn).add(offset, 'minutes').toDate(),
          clockOut: moment(timesheet.clockOut).add(offset, 'minutes').toDate(),
        };
      }),
    };

    await httpService.post(`${FsxUri.maintenance.timesheet.base}`, payload);
    modalSuccess();
  };

  return (
    <Suspense fallback={<Loader />}>
      <TimeSheetForm initialValues={initialFormValues} onSubmit={handleSubmit} />
    </Suspense>
  );
};

export default TimeSheetNew;
