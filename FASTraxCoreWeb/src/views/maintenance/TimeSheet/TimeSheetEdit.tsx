import {Confirm, Loader} from '@app/components/common';
import React, {Suspense} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {FormikHelpers} from 'formik';
import {FsxUri} from '@app/helpers/endpoints';
import TimeSheetForm from './TimeSheetForm';
import httpService from '@app/services/http.service';

const TimeSheetEdit = () => {
  let history = useHistory();
  let {id} = useParams<{id: string}>();

  const [
    timesheetPersonnelMaintenance,
    setTimesheetPersonnelMaintenance,
  ] = React.useState<TimesheetPersonnelMaintenance>();

  React.useEffect(() => {
    (async () => {
      const res = await httpService.get(`${FsxUri.maintenance.timesheet.base}/details/${id}`);
      setTimesheetPersonnelMaintenance(res.data);
    })();
  }, [id]);

  const modalSuccess = () => {
    Confirm({
      text: 'Inspection successfully updated',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => history.push('/app/maintenance/timesheet'),
    });
  };

  const handleSubmit = async (
    values: typeof initialFormValues,
    _formikHelpers: FormikHelpers<typeof initialFormValues>,
  ) => {
    console.log('SUBMIT VALUES', values);
    const regex = /timesheet-temp-id/;
    const payload: TimesheetPersonnelMaintenance = {
      ...values,
      timesheets: values?.timesheets?.map(timesheet => {
        return {
          ...timesheet,
          id: timesheet.id
            ? regex.test(timesheet.id?.toString())
              ? 0
              : timesheet.id
            : timesheet.id,
        };
      }),
    };

    delete payload.personnel;

    await httpService.patch(`${FsxUri.maintenance.timesheet.base}/${payload.id}`, payload);

    modalSuccess();
  };

  if (!timesheetPersonnelMaintenance) return <Loader />;

  const initialFormValues: TimesheetPersonnelMaintenance = {
    id: timesheetPersonnelMaintenance.id,
    personnel: timesheetPersonnelMaintenance.personnel,
    personnelId: timesheetPersonnelMaintenance.personnelId,
    referenceNo: timesheetPersonnelMaintenance.referenceNo,
    timesheets: timesheetPersonnelMaintenance.timesheets?.map(timesheet => ({
      ...timesheet,
      datePerformed: new Date(timesheet.datePerformed),
      clockIn: new Date(timesheet.clockIn),
      clockOut: new Date(timesheet.clockOut),
    })),
  };

  return (
    <Suspense fallback={<Loader />}>
      <TimeSheetForm initialValues={initialFormValues} onSubmit={handleSubmit} editMode />
    </Suspense>
  );
};

export default TimeSheetEdit;
