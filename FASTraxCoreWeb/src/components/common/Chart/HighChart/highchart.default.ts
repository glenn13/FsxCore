import * as Highcharts from 'highcharts';

type CategoryType = {
  percentage: false;
};

export type HighchartBuildType = {
  data?: Array<any> | null;
  valueField: string;
  seriesFromField?: string | null;
  xField: string | null;
  categoryField?: string | null;
  category?: CategoryType;
  series?: any;
};

export type HighChartOption = typeof Highcharts.defaultOptions & {buildType?: HighchartBuildType};

const Default: HighChartOption = {
  chart: {
    spacingRight: 0,
    spacingBottom: 0,
    spacingLeft: 0,
    zoomType: 'x',
    height: 250,
    style: {
      fontFamily: 'Roboto, Helvetica, Clean, sans-serif',
      fontSize: '12px',
    },
    // plotBackgroundColor: null,
    // plotBorderWidth: null,
    plotShadow: false,
    events: {
      load: function (e: any) {
        e.target.series[0].data.forEach((p: any) => {
          if (!p.selected) {
            p.update(
              {
                dataLabels: {
                  enabled: false,
                },
              },
              false,
              false,
            );
          }
        });

        e.target.update({
          dataLabels: {
            enabled: true,
          },
        });
      },
    },
  },
  credits: {
    enabled: false,
  },
  title: {
    text: undefined,
    margin: 25,
  },
  subtitle: {
    text: undefined,
  },
  series: [],
  xAxis: {
    categories: undefined,
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: undefined,
    gridLineColor: '#f1f1f1',
  },
  colors: [
    '#C0D6F8',
    '#4da2d2',
    '#5daedb',
    '#6cbae4',
    '#7cc6ed',
    '#8bd2f6',
    '#9adeff',
    '#5daff1',
    '#6eb8f4',
    '#7dc1f7',
    '#8dc9f9',
    '#9cd2fc',
    '#abdbff',
  ],
};

const PieCenteredLabel = {
  chart: {
    type: 'pie',
    events: {
      load: function (e: any) {
        e.target.series[0].data.forEach((p: any) => {
          if (!p.selected) {
            p.update(
              {
                dataLabels: {
                  enabled: false,
                },
              },
              false,
              false,
            );
          }
        });

        e.target.update({
          dataLabels: {
            enabled: true,
          },
        });
      },
    },
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        align: 'center',
        format:
          '<strong class="font-bold text-3xl">{point.percentage:.0f}%<br/><br/><br/><small>{point.name}</small>',
        distance: '-100%',
        style: {
          fontWeight: 300,
          fontSize: 11,
        },
      },
      innerSize: '60%',
      point: {
        events: {
          mouseOver: function (e: any) {
            e.target.series.data.forEach((p: any) => {
              p.update(
                {
                  dataLabels: {
                    enabled: false,
                  },
                },
                false,
                false,
              );
            });

            e.target.update({
              dataLabels: {
                enabled: true,
              },
            });
          },
        },
      },
    },
  },
};

const StackedColumn = {
  chart: {
    type: 'column',
  },
  plotOptions: {
    column: {
      stacking: 'normal',
    },
  },
};

const StackedBar = {
  chart: {
    type: 'bar',
  },
  plotOptions: {
    series: {
      stacking: 'normal',
    },
  },
};

const Configs = {
  // Default Configs
  Default,

  // Pie with Centered Label Inside the Donut like chart
  PieCenteredLabel,

  // Column Chart

  // Stacked Column
  StackedColumn,
  // Stacked Bar
  StackedBar,
};

export default Configs;
