import {
  LogLevel,
  HubConnectionBuilder,
  HubConnectionState,
  HubConnection,
  MessageHeaders,
  HttpTransportType,
} from '@microsoft/signalr';
import userService from '../services/user.service';
import {decryptMe} from '@app/utils/encryption.util';
import {RequestHeader} from '@app/entities/RequestHeader';
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

export const setUpSignalRConnection = async () => {
  const jwt = userService.Local.currentUser.get()?.jwtToken || '';

  const headers = getRequestHeaders();
  const connection = new HubConnectionBuilder()
    .withUrl('http://localhost:4444/notification', {
      accessTokenFactory: () => jwt,
      headers,
      withCredentials: true,
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  connection.on('AddToNotification', (message: string) => {
    console.log('Hello ', message);
  });

  try {
    await connection.start().then(a => {
      console.log('connected');
    });
  } catch (err) {
    console.log(err);
  }

  if (connection.state === HubConnectionState.Connected) {
  } else if (connection.state === HubConnectionState.Disconnected) {
  }

  return connection;
};
