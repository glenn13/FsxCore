import {AxiosResponse} from 'axios';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {useQuery} from 'react-query';

export const getReportList = async () => {
  return http.get<ReportType[]>(uri.report.reportList.base);
};

export const getReportItem = async (reportName: string) => {
  return http.get<ReportType>(uri.report.reportItem.findByReportName(reportName));
};

const REPORT_LIST = 'REPORT_LIST';
export const useReports = () => {
  const result = useQuery(REPORT_LIST, async () => {
    const {data} = await getReportList();
    return data as Array<ReportType>;
  });

  return result;
};
