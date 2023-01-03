import { Subject } from 'rxjs'
import signalR from './index'
import _ from 'lodash';
import {
  HubConnectionState,
} from '@microsoft/signalr';

interface approvalFromUser {
    username: string;
  }
  
interface currentUser {
  username: string;
  firstName: string;
  lastName: string;
}

export interface TransactionGroup {
  id: number;
  name: string;
  notificationForApprovals: NotificationForApproval[]
}

export interface TransactionAssetCategory {
  id: number;
  title: string;
}

export interface TransactionGroupCategory {
  id: number;
  transactionGroupId: number;
  transactionGroup?: TransactionGroup;
  assetCategoryId: number;
  assetCategory: TransactionAssetCategory;
}

interface TransactionType {
  id: number;
  name: string;
}

export interface NotificationForApproval {
  id: number;
  name: string;
  notificationId: number;
  notification: Notification;
  referenceNo: string;
  transactionGroupId: number;
  transactionGroup: TransactionGroup;
}
  
export interface Notification {
  id: number;
  notificationGroupId: number;
  transactionGroupId: number;
  transactionGroup?: TransactionGroup;
  transactionGroupCategoryId: number;
  transactionGroupCategory?: TransactionGroupCategory;
  transactionTypeId: number;
  transactionType: TransactionType;
  createdByUserId: number;
  createdByUser: currentUser;
  approvalFromUserId: number;
  approvalFromUser: approvalFromUser;
  referenceNo: string;
  referenceId: number;
  dateCreated: Date | string;
}

export interface ForApprovalCount {
  transactionType: string;
  count: number;
}

const standardNotificationSubject = new Subject<Notification[]>();
const notificationForApprovalSubject = new Subject<ForApprovalCount[]>();
const forApprovalByModuleSubject = new Subject<TransactionGroup[]>();

const standardNotifications = {
    set: (value: Notification[]) => standardNotificationSubject.next(value),
    get value() { return standardNotificationSubject.asObservable() },
}

const forApprovalNotifications = {
  set: (value: ForApprovalCount[]) => notificationForApprovalSubject.next(value),
  get value() { return notificationForApprovalSubject.asObservable() },
}

const forApprovalBySelectedModule = {
  set: (value: TransactionGroup[]) => forApprovalByModuleSubject.next(value),
  get value() { return forApprovalByModuleSubject.asObservable() },
}

const init = () => {
    const connection = signalR.setupConnnection('/session', () => {
      connection.invoke("GetStandardNotification");
      connection.invoke("GetForApprovalNotification");
    });
    
    connection.on('ReceiveStandardNotification', (items: []) => {
      if (items.length > 0) standardNotifications.set(items);
      
      connection.invoke("GetForApprovalNotification");
    });

    connection.on('ReceiveNotificationsForApproval', (items: []) => {
      if(items.length > 0) forApprovalNotifications.set(items);
    });
  
    connection.on('ReceiveNotificationsForApprovalByModule', (items: []) => {
      if(items.length > 0) forApprovalBySelectedModule.set(items);
    });
  
    if (connection.state === HubConnectionState.Connected) {
      
    }
  
  return connection;
}

const notificationStore = {
  init,
  standardNotifications,
  forApprovalNotifications,
  forApprovalBySelectedModule
}
  
export default notificationStore;