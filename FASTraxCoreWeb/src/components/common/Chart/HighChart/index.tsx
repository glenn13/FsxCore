import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import {useWindowSize} from '@app/hooks/useWindowSize';
import SvgIcon from '../../SvgIcon';
import Button from '../../Button';
import Tooltip from '../../Tooltip';
import ButtonDropdown from '../../ButtonDropdown';
import ButtonDropdownItem from '../../ButtonDropdown/ButtonDropdownItem';
import {UUID} from '@app/utils/uuid.util';

import Config, {HighChartOption} from './highchart.default';
import {HighChartTable} from './HighChartTable';
import {HighChartBuilder} from './highchart.builder';

// Load Highcharts modules
require('highcharts/modules/exporting')(Highcharts);

interface IChartProps {
  options?: object;
  exportChart?: boolean;
  data?: Array<any> | null;
  columns?: Array<string>;
  chartType:
    | 'pie'
    | 'pieCenteredLabel'
    | 'column'
    | 'bar'
    | 'line'
    | 'stackedBar'
    | 'stackedColumn';
}

const HighchartWrapperStyled = styled.div`
  svg rect.highcharts-background {
    fill: ${props => props.theme.panel.bgColor};
  }

  svg .highcharts-title {
    fill: ${props => `${props.theme.text.color} !important`};
  }

  svg .highcharts-text-outline {
    display: none;
  }

  svg g.highcharts-label.highcharts-data-label text {
    fill: ${props => `${props.theme.text.color} !important`};
  }

  svg g.highcharts-exporting-group {
    display: none;
  }

  .chart-top-actions {
    display: flex;
    justify-content: flex-end;

    button {
      width: 30px;
    }
  }
`;

export const Index: React.FC<IChartProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  exportChart = true,
  data,
  columns,
  ...props
}) => {
  const [chartOption, setChartOption] = React.useState<any>();
  const chartRef = useRef<any>(null);
  const windowSize = useWindowSize();
  let _configChart: HighChartOption;

  switch (props.chartType) {
    case 'pieCenteredLabel':
      _configChart = _.merge(
        {},
        _.merge({}, Config.Default, Config.PieCenteredLabel),
        props.options,
      );
      break;

    case 'stackedBar':
      _configChart = _.merge({}, _.merge({}, Config.Default, Config.StackedBar), props.options);
      break;

    case 'stackedColumn':
      _configChart = _.merge({}, _.merge({}, Config.Default, Config.StackedColumn), props.options);
      break;

    default:
      const _default = {
        chart: {
          type: props.chartType,
        },
      };

      _configChart = _.merge({}, _.merge({}, Config.Default, _default), props.options);
      break;
  }

  //   useEffect(() => {
  //     chartRef.current.chart.reflow();
  //     return () => {};
  //   }, []);

  const debounce = React.useCallback(
    _.debounce(() => {
      if (!chartRef.current) return;

      chartRef.current.chart.container.style.width = '100%';
      chartRef.current.chart.container.childNodes[0].setAttribute('width', '100%');
    }, 300),
    [],
  );

  //   const reflow = React.useCallback(() => {
  //     chartRef.current && chartRef.current.chart.reflow();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [windowSize.width]);

  React.useEffect(() => {
    debounce();
    // reflow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.width, windowSize.height]);

  const handleExportChartToType = (imageType: string) =>
    chartRef.current.chart.exportChart({type: imageType});

  const hTooltipId_btn_table = UUID();
  const hTooltipId_btn_print = UUID();
  const hTooltipId_btn_export = UUID();

  const [isViewTable, setIsViewTable] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!data) return;

    var _data = HighChartBuilder.buildChartData({data, ..._configChart.buildType});
    setChartOption({..._configChart, series: _data.series, xAxis: {categories: _data.categories}});
  }, [data]);

  return (
    <HighchartWrapperStyled>
      {exportChart && (
        <ul className="chart-top-actions">
          <li>
            <Button
              className="pr-5"
              transparent
              circle
              onClick={e => setIsViewTable(!isViewTable)}
              data-tooltip-for={hTooltipId_btn_table}
              data-tooltip-message="View Details">
              <SvgIcon size={14} color="#333" svgId="copy-clipboard" style={{margin: '0 auto'}} />
            </Button>
            <Tooltip id={hTooltipId_btn_table} position="bottom" />
          </li>
          <li>
            <Button
              className="pr-5"
              transparent
              circle
              onClick={e => chartRef.current.chart.print()}
              data-tooltip-for={hTooltipId_btn_print}
              data-tooltip-message="Print Chart">
              <SvgIcon size={14} color="#333" svgId="print" style={{margin: '0 auto'}} />
            </Button>
            <Tooltip id={hTooltipId_btn_print} position="bottom" />
          </li>
          <li>
            <ButtonDropdown
              data-tooltip-for={hTooltipId_btn_export}
              data-tooltip-message="Export Chart"
              icon={
                <SvgIcon size={14} color="#333" svgId="cloud-download" style={{margin: '0 auto'}} />
              }
              transparent
              ripple
              circle
              dropPosition="bottom-right">
              <ButtonDropdownItem onClick={e => handleExportChartToType('png')}>
                Download as PNG
              </ButtonDropdownItem>
              <ButtonDropdownItem onClick={e => handleExportChartToType('jpeg')}>
                Download as JPEG
              </ButtonDropdownItem>
              <ButtonDropdownItem onClick={e => handleExportChartToType('svg')}>
                Download as SVG
              </ButtonDropdownItem>
              <ButtonDropdownItem onClick={e => handleExportChartToType('pdf')}>
                Download as PDF
              </ButtonDropdownItem>
            </ButtonDropdown>
            <Tooltip id={hTooltipId_btn_export} position="bottom" />
          </li>
        </ul>
      )}
      <div className="relative overflow-hidden">
        <HighchartsReact ref={chartRef} highcharts={Highcharts} options={chartOption} />
        <HighChartTable slideUp={isViewTable} chartData={data} columns={columns} />
      </div>
    </HighchartWrapperStyled>
  );
};

export default React.memo(Index);
