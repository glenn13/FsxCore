import React, {Suspense} from 'react';

import {Loader} from '../../components/common';

const TimeSheetLazyLoad = React.lazy(() => import('../../views/maintenance/TimeSheet'));
const TimeSheetNewLazyLoad = React.lazy(
  () => import('../../views/maintenance/TimeSheet/TimeSheetNew'),
);
const TimeSheetEditLazyLoad = React.lazy(
  () => import('../../views/maintenance/TimeSheet/TimeSheetEdit'),
);

export const TimeSheet = () => {
  return (
    <Suspense fallback={<Loader />}>
      <TimeSheetLazyLoad />
    </Suspense>
  );
};

export const TimeSheetNew = () => {
  return (
    <Suspense fallback={<Loader />}>
      <TimeSheetNewLazyLoad />
    </Suspense>
  );
};

export const TimeSheetEdit = () => {
  return (
    <Suspense fallback={<Loader />}>
      <TimeSheetEditLazyLoad />
    </Suspense>
  );
};
