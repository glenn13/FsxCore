import {HighchartBuildType} from './highchart.default';
import _ from 'lodash';

const getUniqueFromArrayObjects = (items: any, prop: string) =>
  _.uniq(_.map(items, item => item[prop]));

export const HighChartBuilder = {
  buildChartData: (cOption: any) => {
    var option: HighchartBuildType = {
      data: null,
      valueField: 'y',
      xField: null,
      categoryField: null,
      series: [],
      seriesFromField: '',
      category: {
        percentage: false,
      },
    };

    var _options: typeof option = _.extend({}, option, cOption);

    var _dataRow: any = [],
      categories: any = [];

    if (!_.isEmpty(_.get(_options, 'series')) && _.get(_options, 'series').length > 0) {
      if (_.isEmpty(_.get(_options, 'categoryField'))) {
        categories = _.uniq(
          _.map(_options.data, function (e: any) {
            return e[_options.xField || ''];
          }),
        );

        _.each(_options.series, function (b, i) {
          var _rows_item: any = [],
            _rows_itemOrig: any = [],
            _rows_data: any = [];

          _.each(categories, function (n_value, n_indx) {
            if (!_options.data) return;

            var _res = _options.data.filter(function (e: any, d: any, a: any) {
              return e[_options.xField || ''] === n_value && e['name'] === b;
            });
            var _value = 0;

            if (_res.length > 0) {
              if (_options.category && _options.category.percentage) {
                var sumTotal = _options.data.reduce(
                  (t: any, n: any) => t + n[_options.valueField],
                  0,
                );
                _value = (parseFloat(_res[0][_options.valueField]) / sumTotal) * 100;
                _rows_itemOrig.push(_res[0][_options.valueField]);
              } else _value = _res[0][_options.valueField];
            } else {
              _value = 0;
              _rows_itemOrig.push(0);
            }

            _rows_item.push(_value);

            // Gets result data item
            _rows_data.push(_res[0] || {});
          });

          _dataRow.push({
            name: b,
            data: _rows_item,
            origdata: _rows_itemOrig,
            dataItem: _rows_data,
          });
        });
      } else {
        _options.categoryField &&
          _.each(getUniqueFromArrayObjects(_options.data, _options.categoryField), (val, i) => {
            var _categories = _.map(
              _.find(_options.data, function (e) {
                if (_options.categoryField && e[_options.categoryField] === val) return true;
              }),
              function (e) {
                return _options.xField && e[_options.xField];
              },
            );

            categories.push({
              name: val,
              categories: _categories,
            });
          });

        _.each(_options.series, (e, i) => {
          var _rows_item: any = [];
          _.each(categories, (c_value: any, c_indx: any) => {
            _.each(c_value.categories, (s_value, s_indx) => {
              if (!_options.data) return;

              var _res = _options.data.filter(function (e: any, d: any, a: any) {
                return e['category'] === c_value.name && e['name'] === s_value;
              });

              if (_res.length > 0) {
                var _value = 0;

                if (_options.category && _options.category.percentage) {
                  var sumTotal = _options.data.reduce(
                    (t: any, n: any) => t + n[_options.valueField],
                    0,
                  );
                  _value = (parseFloat(_res[0][_options.valueField]) / sumTotal) * 100;
                } else _value = _res[0][_options.valueField];

                _rows_item.push(_value);
              }
            });
          });

          _dataRow.push({name: e, data: _rows_item});
        });
      }
    } else {
      var _series =
        _options.seriesFromField &&
        getUniqueFromArrayObjects(_options.data, _options.seriesFromField);

      if (!_.isEmpty(_options.categoryField)) {
        _.each(
          _options.categoryField &&
            getUniqueFromArrayObjects(_options.data, _options.categoryField),
          function (val, i) {
            var _categories = _.uniq(
              _.map(
                _.find(_options.data, function (e) {
                  if (_options.categoryField && e[_options.categoryField] === val) return true;
                }),
                function (e) {
                  return _options.xField && e[_options.xField];
                },
              ),
            );

            categories.push({
              name: val,
              categories: _categories,
            });
          },
        );

        _.each(_series, function (b, i) {
          var _rows_item: any = [],
            _rows_itemOrig: any = [],
            _rows_data: any = [];
          _.each(categories, function (c_value: any, c_indx: any) {
            _.each(c_value.categories, function (s_value, s_indx) {
              if (!_options.data) return;

              var _res = _options.data.filter(function (e: any, d: any, a: any) {
                return (
                  _options.categoryField &&
                  [_options.categoryField] === c_value.name &&
                  _options.xField &&
                  e[_options.xField] === s_value &&
                  _options.seriesFromField &&
                  e[_options.seriesFromField] === b
                );
              });

              if (_res.length > 0) {
                var _value = 0;

                if (_options.category && _options.category.percentage) {
                  var sumTotal = _options.data.reduce(
                    (t: any, n: any) => t + n[_options.valueField],
                    0,
                  );
                  _value = (parseFloat(_res[0][_options.valueField]) / sumTotal) * 100;
                  _rows_itemOrig.push(_res[0][_options.valueField]);
                } else _value = _res[0][_options.valueField];

                _rows_item.push(_value);
                _rows_data.push(_res[0] || {});
              } else {
                _rows_item.push(0);
                _rows_itemOrig.push(0);
                _rows_data.push(_res[0] || {});
              }
            });
          });

          _dataRow.push({
            name: b,
            data: _rows_item,
            origdata: _rows_itemOrig,
            dataItem: _rows_data,
          });
        });
      } else {
        categories = _.uniq(
          _.map(_options.data, function (e) {
            return _options.xField && e[_options.xField];
          }),
        );

        _.each(_series, function (b, i) {
          var _rows_item: any = [],
            _rows_itemOrig: any = [],
            _rows_data: any = [];

          _.each(categories, function (n_value, n_indx) {
            if (!_options.data) return;

            var _res = _options.data.filter(function (e: any, d: any, a: any) {
              return (
                _options.seriesFromField &&
                e[_options.seriesFromField] === b &&
                _options.xField &&
                e[_options.xField] === n_value
              );
            });

            var _value = 0;

            if (_res.length > 0) {
              if (_options.category && _options.category.percentage) {
                var sumTotal = _options.data.reduce(
                  (t: any, n: any) => t + n[_options.valueField],
                  0,
                );
                _value = (parseFloat(_res[0][_options.valueField]) / sumTotal) * 100;
                _rows_itemOrig.push(_res[0][_options.valueField]);
              } else _value = _res[0][_options.valueField];
            }

            _rows_item.push({
              name: n_value,
              y: _value,
              selected: _.get(_res[0], 'selected') || false,
            });

            _rows_data.push(_res[0] || {});
          });

          _dataRow.push({
            name: b,
            data: _rows_item,
            origdata: _rows_itemOrig,
            dataItem: _rows_data,
          });
        });
      }
    }

    return {
      categories: categories,
      series: _dataRow,
    };
  },
};
