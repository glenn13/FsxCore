import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {Notification, ForApprovalCount} from '@app/store/signalr/notificationStore';

export const getNotificationStandard = async () => {
  return http.get<Notification[]>(uri.notification.standard.base);
};

export const getNotificationForApprovalCounts = async () => {
  return http.get<ForApprovalCount[]>(uri.notification.forApprovals.base);
};