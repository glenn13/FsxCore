import React from 'react';
import {HighChartOption} from '@app/components/common/Chart/HighChart/highchart.default';
import {makeStyles} from '@material-ui/styles';
import {Chart} from '../../components/common';
import TransitionWrapper from '../../components/common/TransitionWrapper';
import Highcharts from 'highcharts';

export interface DashboardProps {}

const useStyle = makeStyles({
  widgetCards: {
    backgroundColor: `var(--panel-bg-color)`,
    borderRadius: 4,
    boxShadow: '0px 3px 13px -5px var(--shadow-color)',
    minHeight: 180,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'relative',
    marginBottom: 15,
  },
  sideCountTitle: {
    borderBottom: '1px solid #f7f5f5',
    marginBottom: 4,
    paddingBottom: 4,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'Roboto',
    color: '#757c84',
    display: 'block',
  },
  sideCoundSubTitle: {
    fontSize: 12,
    fontWeight: 300,
    fontFamily: 'Roboto',
    color: '#7b8591',
    paddingBottom: 1,
    display: 'block',
    textAlign: 'center',
  },
  sideCoundSubData: {
    fontSize: '1.875rem',
    fontWeight: 400,
    fontFamily: 'Roboto',
    paddingBottom: 1,
    textAlign: 'center',
    marginBottom: -5,
  },
});

export interface DashboardProps {}

const Highchart = Chart.HighChart;

const Dashboard: React.FC<DashboardProps> = () => {
  const classes = useStyle();

  const AssetAvailabilityStatus: any = {
    title: {
      text: 'Asset Availability Status',
    },
    series: [],
    buildType: {
      valueField: 'y',
      xField: 'name',
      seriesFromField: 'category',
    },
  };

  const AssetAvailabilityStatusData = [
    {
      category: 'Status',
      name: 'NMCM',
      y: 30,
    },
    {
      category: 'Status',
      name: 'NMCS',
      y: 60,
      selected: true,
      hidden: true,
    },
  ];

  const AssetCompositionByGroup: HighChartOption = {
    chart: {
      height: 320,
    },
    title: {
      text: 'Availability Composition % By Group',
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      max: 100,
      labels: {
        formatter: function () {
          var _this: any = this;
          return Highcharts.numberFormat(_this.value, 0, ',') + '%';
        },
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        pointWidth: 70,
      },
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        var _this: any = this;
        return (
          '<table class="tooltip_hc_custom">' +
          '<tr><td>Category</td><td>' +
          _this.series.name +
          '</td></tr>' +
          '<tr><td>Count (%)</td><td>' +
          _this.point.y +
          '%</td></tr>' +
          '</table>'
        );
      },
    },
    series: [],
    buildType: {
      valueField: 'y',
      xField: 'name',
      seriesFromField: 'name',
    },
  };

  const AssetCompositionByGroupData = [
    {
      name: 'Aid And Development',
      y: 49,
    },
    {
      name: 'Private and Commercial',
      y: 33,
    },
  ];

  const WorkOrderByMaintenanceType: HighChartOption = {
    title: {
      text: 'Work Order % By Maintenance Type',
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      max: 100,
      labels: {
        formatter: function () {
          var _this: any = this;
          return Highcharts.numberFormat(_this.value, 0, ',') + '%';
        },
      },
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        var _this: any = this;
        return (
          '<table class="tooltip_hc_custom">' +
          '<tr><td>Type</td><td>' +
          _this.series.name +
          '</td></tr>' +
          '<tr><td>WO (%)</td><td>' +
          _this.point.y +
          '%</td></tr>' +
          '</table>'
        );
      },
    },
    series: [],
    buildType: {
      valueField: 'y',
      xField: 'name',
      seriesFromField: 'name',
    },
  };

  const WorkOrderByMaintenanceTypeData = [
    {
      name: 'Common',
      y: 58,
    },
    {
      name: 'Re-Work',
      y: 16,
    },
    {
      name: 'Warranty',
      y: 10,
    },
    {
      name: 'Third-Party',
      y: 15,
    },
  ];

  const AssetAvailabilityPercentByStatus: HighChartOption = {
    title: {
      text: 'Asset Availability % By Status',
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        pointWidth: 70,
      },
    },
    yAxis: {
      max: 100,
      labels: {
        formatter: function () {
          var _this: any = this;
          return Highcharts.numberFormat(_this.value, 0, ',') + '%';
        },
      },
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        var _this: any = this;
        return (
          '<table class="tooltip_hc_custom">' +
          '<tr><td>Status</td><td>' +
          _this.series.name +
          '</td></tr>' +
          '<tr><td>Asset (%)</td><td>' +
          _this.point.y +
          '%</td></tr>' +
          '</table>'
        );
      },
    },
    series: [],
    buildType: {
      valueField: 'y',
      xField: 'name',
      seriesFromField: 'name',
    },
  };

  const AssetAvailabilityPercentByStatusData = [
    {
      name: 'NMCM',
      y: 30,
    },
    {
      name: 'NMCS',
      y: 70,
    },
  ];

  const StockProfilePercentage: HighChartOption = {
    title: {
      text: 'Stock Profile Percentage',
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      max: 100,
      lineColor: '#f1f1f1',
      lineWidth: 1,
      tickWidth: 0,
      title: {
        text: 'Y Axis Title',
        rotation: 0,
        margin: 50,
      },
      labels: {
        formatter: function () {
          var _this: any = this;
          return Highcharts.numberFormat(_this.value, 0, ',') + '%';
        },
      },
    },
    tooltip: {
      valueSuffix: ' %',
      useHTML: true,
      formatter: function () {
        var _this: any = this;
        return (
          '<table class="tooltip_hc_custom">' +
          '<tr><td>Category</td><td>' +
          _this.series.name +
          '</td></tr>' +
          '<tr><td>Count (%)</td><td>' +
          _this.point.y +
          '</td></tr>' +
          '</table>'
        );
      },
    },
    series: [],
    buildType: {
      valueField: 'y',
      xField: 'category',
      seriesFromField: 'name',
    },
  };

  const StockProfilePercentageData = [
    {
      category: 'Stocking',
      name: 'NMCM',
      y: 20,
    },
    {
      category: 'Non-Stocking',
      name: 'NMCM',
      y: 71.5,
    },
    {
      category: 'Phase-out',
      name: 'NMCM',
      y: 49,
    },
    {
      category: 'Inactive',
      name: 'NMCM',
      y: 31,
    },
  ];

  const StockDemandVsSupply: HighChartOption = {
    chart: {
      type: 'column',
      inverted: true,
    },
    title: {
      text: 'Stock Demand vs Supply Comparison',
    },
    subtitle: {
      text: 'Per Stock Category',
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0,
      },
    },
    series: [
      //   {name: 'Demand USD', data: [50, 100], pointPadding: 0.3, pointPlacement: -0.2},
      //   {name: 'Supply USD', data: [20, 30], pointPadding: 0.4, pointPlacement: -0.2},
    ],
    tooltip: {
      shared: true,
      useHTML: true,
    },
    buildType: {
      valueField: 'y',
      seriesFromField: 'name',
      xField: 'category',
    },
  };

  const StockDemandVsSupplyData = [
    {
      category: 'Engine',
      name: 'Demand USD',
      y: 50,
    },
    {
      category: 'CONSUMABLES',
      name: 'Demand USD',
      y: 100,
    },
    {
      category: 'Engine',
      name: 'Supply USD',
      y: 20,
    },
    {
      category: 'CONSUMABLES',
      name: 'Supply USD',
      y: 30,
    },
  ];

  return (
    <TransitionWrapper className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-row flex-wrap">
        <div className="lg:h-full w-col sm:w-full lg:w-3/4 ">
          <div className="flex flex-1 flex-row flex-wrap">
            <div className="w-full">
              <div className={classes.widgetCards}>
                <Highchart
                  chartType="stackedColumn"
                  data={AssetCompositionByGroupData}
                  options={AssetCompositionByGroup}
                  columns={['Project Group', 'Count']}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-row flex-wrap">
            <div className="w-col sm:w-full md:w-1/2">
              <div className={classes.widgetCards}>
                <Highchart
                  data={AssetAvailabilityPercentByStatusData}
                  chartType="stackedColumn"
                  options={AssetAvailabilityPercentByStatus}
                  columns={['Status', 'Count']}
                />
              </div>
            </div>
            <div className="w-col sm:w-full md:w-1/2">
              <div className={classes.widgetCards}>
                <Highchart
                  data={WorkOrderByMaintenanceTypeData}
                  chartType="stackedColumn"
                  options={WorkOrderByMaintenanceType}
                  columns={['Maintenance Type', 'Count']}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-row flex-wrap">
            <div className="w-col sm:w-full lg:w-1/2">
              <div className={classes.widgetCards}>
                <Highchart
                  data={StockProfilePercentageData}
                  chartType="bar"
                  options={StockProfilePercentage}
                  columns={['Profile', 'Percentage']}
                />
              </div>
            </div>
            <div className="w-col sm:w-full lg:w-1/2">
              <div className={classes.widgetCards}>
                <Highchart
                  data={StockDemandVsSupplyData}
                  chartType="column"
                  options={StockDemandVsSupply}
                  columns={['Name', 'Category', 'Count']}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:h-full w-col w-full sm:w-full lg:w-1/4 pl-2">
          <div className={classes.widgetCards}>
            <Highchart
              data={AssetAvailabilityStatusData}
              chartType="pieCenteredLabel"
              options={AssetAvailabilityStatus}
              columns={['Name', 'Count']}
            />
          </div>

          <div className={classes.widgetCards}>
            <div className="mb-3">
              <div className={classes.sideCountTitle}>Asset On Reserved</div>
              <div className="flex flex-row pt-1">
                <div className="w-col w-full sm:w-full lg:w-1/2">
                  <div className={classes.sideCoundSubData + ` currencySymbol`}>975K</div>
                  <span className={classes.sideCoundSubTitle}>Total Asset Value</span>
                </div>
                <div className="w-col w-full sm:w-full lg:w-1/2">
                  <div className={classes.sideCoundSubData + ` currencySymbol`}>120K</div>
                  <span className={classes.sideCoundSubTitle}>Total Stock Value</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className={classes.sideCountTitle}>Work Order</div>
              <div className="flex flex-row pt-1">
                <div className="w-col w-full sm:w-full lg:w-1/2">
                  <div className={classes.sideCoundSubData + ` currencySymbol`}>80K</div>
                  <span className={classes.sideCoundSubTitle}>In Progress</span>
                </div>
                <div className="w-col w-full sm:w-full lg:w-1/2">
                  <div className={classes.sideCoundSubData + ` currencySymbol`}>320K</div>
                  <span className={classes.sideCoundSubTitle}>Receivable</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className={classes.sideCountTitle}>Purchase</div>
              <div className="flex flex-row pt-1">
                <div className="w-col w-1/2">
                  <div className={classes.sideCoundSubData + ` currencySymbol`}>7K</div>
                  <span className={classes.sideCoundSubTitle}>For Receiving</span>
                </div>
                <div className="w-col w-1/2">
                  <div className={classes.sideCoundSubData + ` currencySymbol`}>10K</div>
                  <span className={classes.sideCoundSubTitle}>Payable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
};

export default React.memo(Dashboard);
