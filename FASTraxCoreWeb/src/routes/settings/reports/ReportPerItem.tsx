import React, {Suspense} from 'react';
import {useHistory} from 'react-router-dom';
import ReportViewer from '@app/views/reports/ReportViewer';
import {Button, SvgIcon} from '@app/components/common';
import StorageService from '@app/services/storage.service';
import {getReportItem} from '@app/services/settings/report.service';

export interface ReportPerItemProps {}

export interface ReportItemParams {
  reportName: string;
  parameter?: object;
}

const ReportPerItem: React.FC<ReportPerItemProps> = props => {
  const history = useHistory();
  const [reportItem, setReportItem] = React.useState<ReportType>();
  const [reportParamStorage, setReportParamStorage] = React.useState<ReportItemParams>();

  React.useEffect(() => {
    const report = StorageService.get<ReportItemParams>('sessionStorage', 'REPORT_ITEM');

    if (!report) return;

    const {reportName, ...reportParams} = report;

    reportParams && setReportParamStorage(report);
    getReportItem(reportName).then(res => setReportItem(res.data));
  }, []);

  const reportToLoad = React.useMemo(() => reportItem, [setReportItem, reportItem]);
  return (
    <>
      <div className="flex flex-row px-3">
        <div className="flex-grow text-md pt-4 font-medium">{reportItem?.reportName}</div>
        <Button rounded small ripple className="mb-3" onClick={() => history.goBack()}>
          <SvgIcon size={14} color="#fff" svgId="arrow-left" style={{marginRight: 3}} />
          Back to list
        </Button>
      </div>

      {reportToLoad && (
        <ReportViewer
          reportName={reportToLoad.reportName}
          reportFile={reportToLoad.reportFile}
          reportParameters={reportParamStorage}
        />
      )}
    </>
  );
};

export default React.memo(ReportPerItem);
