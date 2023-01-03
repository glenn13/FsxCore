interface ReportType {
  module: string;
  subModule: string;
  reportName: string;
  reportFile: string;
  icon: string;
  perItem: boolean;
  onClick?: (report: ReportType) => void;
}
