import React from 'react';
import ReportOption, {ReportOptionProps} from './ReportOption';
import ReportViewer from './ReportViewer';
import {Button, SvgIcon} from '@app/components/common';
import _ from 'lodash';

export interface ReportsMainProps extends ReportOptionProps {}

const ReportsMain: React.FC<ReportsMainProps> = ({showByModuleName, ...props}) => {
  const [showReportViewer, setShowReportViewer] = React.useState<boolean>(false);
  const [reportType, setReportType] = React.useState<ReportType | null>(null);

  return (
    <div className="flex flex-1 flex-col h-full">
      {!showReportViewer && (
        <ReportOption
          {...props}
          showByModuleName={showByModuleName}
          onReportClick={reportType => {
            setReportType(reportType);
            setShowReportViewer(!!reportType.reportName);
          }}
        />
      )}

      {showReportViewer && (
        <>
          <div className="flex flex-row px-3">
            <div className="flex-grow text-md pt-4 font-medium">
              {reportType && reportType.reportName}
            </div>
            <Button
              rounded
              small
              ripple
              className="mb-3"
              onClick={() => setShowReportViewer(!showReportViewer)}>
              <SvgIcon size={14} color="#fff" svgId="arrow-left" style={{marginRight: 3}} />
              Back to list
            </Button>
          </div>

          <ReportViewer reportName={reportType?.reportName} reportFile={reportType?.reportFile} />
        </>
      )}
    </div>
  );
};

export default React.memo(ReportsMain);
