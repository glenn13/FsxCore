import {
  LogLevel,
  HubConnectionBuilder,
  HubConnectionState,
  MessageHeaders,
  HttpTransportType,
} from '@microsoft/signalr';
import userService from '@app/services/user.service';
import {decryptMe} from '@app/utils/encryption.util';
import {RequestHeader} from '@app/entities/RequestHeader';
import config from '@app/config/default';
import _ from 'lodash';

const getRequestHeaders = () => {
  const requestHeaders = decryptMe<RequestHeader>(localStorage.getItem('X-HEADERS') || '');
  const headers: MessageHeaders = {};

  if (!requestHeaders) return headers;

  Object.keys(requestHeaders).forEach(header => {
    headers[`x-${header}`] = _.get(requestHeaders, header);
  });

  return headers;
};

export const setupConnnection = (endpoint: string, callOnceStart: Function) => {
  const jwt = userService.Local.currentUser.get()?.jwtToken || '';

  const headers = getRequestHeaders();
  const connection = new HubConnectionBuilder()
    .withUrl(`${config.App.apiUrl.replace('/api', '')}${endpoint}`, {
      accessTokenFactory: () => jwt,
      headers,
      withCredentials: true,
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  try {
    connection.start().then(a => {
      console.log('connected');
      callOnceStart();
    });
  } catch (err) {
    console.log(err);
  }

  if (connection.state === HubConnectionState.Connected) {
  } else if (connection.state === HubConnectionState.Disconnected) {
  }

  return connection;
};

export default {
  setupConnnection,
};
