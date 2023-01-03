import React from 'react';
import ReportTile from './ReportTile';
import {FsxDropDownList, FsxInput} from '@app/components/common';
import _ from 'lodash';
import {useDebounce} from '@app/hooks/useDebounce';
import {useHistory} from 'react-router-dom';
import {getReportList} from '@app/services/settings/report.service';

export interface ReportOptionProps {
  reportBy: 'module' | 'subModule';
  showByModuleName?: string;
  onReportClick?: (report: ReportType) => void;
}

const ReportOption: React.FC<ReportOptionProps> = ({showByModuleName, onReportClick, ...props}) => {
  const history = useHistory();
  const [reportList, setReportList] = React.useState<ReportType[]>();

  React.useEffect(() => {
    getReportList().then(res => setReportList(res.data.filter(c => !c.perItem)));
  }, []);

  const modules = React.useMemo(() => reportList || [], [reportList, setReportList]);

  const data = React.useMemo(() => {
    if (showByModuleName && !_.isEmpty(showByModuleName))
      return modules.filter(
        item => _.get(item, 'module').toLowerCase() === showByModuleName.toLowerCase(),
      );

    return modules;
  }, [showByModuleName, modules]);

  const dropdownListValues = [
    {id: 0, report: 'All'},
    ..._.uniq(_.map(data, props.reportBy)).map((item, indx) => ({id: indx + 1, report: item})),
  ];

  const [selectedModule, setSelectedModule] = React.useState<any>(dropdownListValues[0]);
  const [inputVal, setInputVal] = React.useState<string>('');
  const [reportToFind, setReportToFind] = React.useState<string>('');
  const [setDebouncedState] = useDebounce(inputVal, (prop: any) => sendFilter(prop), 500);

  const sendFilter = React.useCallback((str: string) => setReportToFind(str), []);

  const handleInput = React.useCallback((event: any) => {
    setInputVal(event.target.value);
    setDebouncedState(event.target.value);
  }, []);

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="widget-box" style={{minHeight: 100}}>
        <div className="flex flex-row">
          <div className="w-col">
            <FsxDropDownList
              data={dropdownListValues}
              value={selectedModule}
              filterable
              textField="report"
              dataItemKey="report"
              label="View Option"
              className="w-64 mt-3"
              onChange={e =>
                setSelectedModule(
                  dropdownListValues.filter(i => i.report === e.target.value.report)[0],
                )
              }
            />
          </div>
          <div className="w-col">
            <FsxInput
              label="Search Report"
              className="w-64 mt-3"
              placeholder="Report here.."
              onInput={handleInput}
            />
          </div>
        </div>
      </div>
      <div className="widget-box flex-grow overflow-auto">
        {data.length > 0 && (
          <ReportTile
            data={data}
            groupByKey={props.reportBy}
            selectedGroupKey={selectedModule.report}
            subReportToFind={reportToFind}
            onReportItemClick={onReportClick}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(ReportOption);
