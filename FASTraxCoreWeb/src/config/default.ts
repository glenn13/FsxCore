import cryptoRandomString from 'crypto-random-string';
import _ from 'lodash';

type ConfigType = {
  App: {
    apiUrl: string;
    secretKey: string;
  };
  Report: {
    url: string;
  };
  MapBox: {
    token: string;
  };
};

const configJson: ConfigType = require('./default.json');

const Configuration: ConfigType = {
  ...configJson,
  App: configJson.App,
};

export default Configuration;
