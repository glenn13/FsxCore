export default {
  all: `/reports`,
  get reportItem() {
    return {
      findByReportName: (reportName: string) => `${this.all}/report-item/${reportName}`,
    };
  },
  get reportList() {
    return {
      base: `${this.all}/reports-list`,
    };
  },
};
