import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavBar, SvgIcon, Button, Badge, FsxDrawer, FsxTable} from '../common';
import Nav from '@app/components/common/Nav';
import {RootState} from '../../store/rootReducer';
import NavItem from '@app/components/common/NavItem';
import {logoutUser} from '../../store/catalog/users/actions';
import ButtonDropdown, {ButtonDropdownPropsRef} from '@app/components/common/ButtonDropdown';
import ButtonDropdownItem from '@app/components/common/ButtonDropdown/ButtonDropdownItem';
import {useHistory, Link} from 'react-router-dom';
import _ from 'lodash';
import styled, {keyframes} from 'styled-components';
import FsxTab from '../common/FsxTab';
import FsxTabItem from '../common/FsxTab/FsxTabItem';
import notificationStore, { Notification, ForApprovalCount, TransactionGroup } from '@app/store/signalr/notificationStore';
import momentUtil from '@app/utils/moment.util';
import { HubConnection } from '@microsoft/signalr'
import { GridColumn } from '@app/helpers/types';
import transactionLocator from '@app/helpers/transactionLocator'
import { GridRowDoubleClickEvent } from '@progress/kendo-react-grid/dist/npm/interfaces/events';
import { ImageResources } from '@app/assets';

const pulse = keyframes`
    from {
        background:  rgba(255, 0, 0, 0.2);
        transform: scale(0,0);
    }

    to {
        background:  rgba(255, 0, 0, 0.3);
        transform: scale(1,1);
    }
`;

const IconNotificationWrapper = styled.div`
  position: relative;
  padding: 5px;

  &.notified:before {
    content: '';
    position: absolute;
    width: 0.45rem;
    height: 0.45rem;
    background-color: red;
    border-radius: 100%;
    z-index: 0;
    top: 3px;
    right: 5px;
  }

  &.notified:after {
    content: '';
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    background: rgba(255, 0, 0, 0);
    border-radius: 100%;
    z-index: 0;
    top: -2px;
    right: -1px;
    animation: ${pulse} 1s infinite;
  }
`;

const NotificationPanel = styled.div`
    width: 340px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
`;

const NotificationTitle = styled.h1`
  padding: 15px 1.2em 10px;
  font-weight: 500;
  font-size: 1.1em;
`;

const NotificationContent = styled.div`
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  display: flex;
  
  &.no-content { justify-content: center; }
`;

const NotificationContentFooter = styled.div`
  display: flex;
  flex-shrink: 1;
`;

const NotificationContentItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 20px 5px;
  align-items: center;

  &:hover {
    cursor: pointer;
    background: #f5f7fb;
  }
`;

const NotificationStandardTime = styled.small`
  align-self: baseline;
  flex-shrink: 0;
  font-size: 0.85em;
  font-weight: 400;
  color: #aab4d0;
`;

const NotificationStandardImage = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  img { border-radius: 50%; }
`;

const NotificationStandardDesciption = styled.div`
  flex-grow: 1;
  padding: .3rem 1rem;
  
  > strong {font-weight: 500;}
  > div {
    font-weight: 100 !important;

    &,
    > span {
      font-weight: 600;
      font-size: 0.90em;
      font-family: Helvetica;
      letter-spacing: 0.05em;
    }
  }

`;

const ForApprovalListItem = styled.div`
    display: flex;
    padding: 10px 20px 10px;

    &:hover {
      background: #f5f7fb;
    }
    
    &.has-count:hover {
      cursor: pointer;
    }
`;

const ModuleLabel = styled.div`
    flex-grow: 1;
    position: relative;
    padding-left: 1rem;
    padding-top: 0.3rem;

    &:before {
      content: '';
      width: 0;
      height: 0;
      border-bottom: 4px solid transparent;
      border-top: 4px solid transparent;
      border-left: 4px solid #384e6e;
      position: absolute;
      left: 0;
      top: 9px;
  }
`;

const BadgeCount = styled(Badge)`
    flex-shrink: 1;
    background-color: #384e6e !important;
    color: #fff;
`;


const ViewAllLink = styled.a`
  padding: 10px;
  margin: 0 auto;
`;

const BlockSpan = styled.span`
  padding-top: 8px;
  display: block;
  font-size: 0.9em;
  text-align: center;
  font-weight: 500;
`;

const Header: React.FC<{}> = () => {
  const reduxdispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: RootState) => state.users.current);
  const logout = () => reduxdispatch(logoutUser());

  const [items, setItems] = React.useState<Notification[]>([]);
  const [forApprovals, setForApprovals] = React.useState<ForApprovalCount[]>([]);
  const [forApprovalByModule, setForApprovalByModule] = React.useState<TransactionGroup[]>([]);
  const [notified, setNotified] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedForApproval, setSelectedForApproval] = React.useState<string>();
  const [hubConn, setHubConn] = React.useState<HubConnection>();
  
  const columns: GridColumn[] = [
    { field: 'referenceNo', title: 'Reference No.', width: "150px" },
    { field: 'dateCreated', title: 'Date Created', type: "date", width: "150px"  },
    { field: 'notification.createdByUser.username', title: 'Created By', width: "150px"  },
    { field: 'notification.transactionGroupCategory.assetCategory.title', title: 'Category', width: "150px"  },
  ];

  React.useEffect(() => {
    const conn = notificationStore.init();

    notificationStore.standardNotifications.value.subscribe({
      next: (value) => {
        setItems([...items, ...value]); 
        setNotified(true);
      }
    })

    notificationStore.forApprovalNotifications.value.subscribe({
      next: (value) => {
        var hasCount = value.some(tg => tg.count > 0);
        if (hasCount) setNotified(true);

        setForApprovals([...forApprovals, ...value]); 
      }
    })

    notificationStore.forApprovalBySelectedModule.value.subscribe({
      next: (value) => {
        setForApprovalByModule(value);
      }
    })

    setHubConn(conn);
  }, []);


  const sortByDates = React.useCallback((values: Notification[]) => {
    return _.sortBy(values, i => momentUtil.utcToDate(i.dateCreated.toLocaleString())).reverse();
  }, [items]);

  const CellItemImageTemplate = (data: any) => {
    const {userImage, firstName, lastName} = data;
    return (
      <img className="h-8 rounded-full" style={{
        objectFit: "fill",
        display: "block"
      }} src={userImage ? `data:${userImage.fileType};base64,${userImage.file}` :`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`} />
    );
  };

  const pushToLink = React.useCallback((notification: Notification) => {
    console.log(notification.transactionGroup?.name || selectedForApproval || "",
    notification.transactionGroupCategory?.assetCategory.title || "",
    notification.referenceId)
    const referenceLink = transactionLocator
      .findUriPath(
        notification.transactionGroup?.name || selectedForApproval || "",
        notification.transactionGroupCategory?.assetCategory.title || "",
        notification.referenceId);

    referenceLink && history.push(referenceLink);
  },[selectedForApproval]);

  const handleGridDblClick = ({ dataItem }: GridRowDoubleClickEvent) => pushToLink(dataItem.notification);

  const btnDropdownRef = React.useRef<any>();

  return (
    <>
    <NavBar>
      <div className="flex flex-1 flex-row-reverse">
        <Nav>
          <NavItem>
              <ButtonDropdown
              ref={btnDropdownRef}
              transparent
              ripple
              circle
              dropPosition="bottom-right"
              icon={
                <IconNotificationWrapper className={notified ? 'notified' : ''}>
                  <SvgIcon
                    size={14}
                    color="#ffffff"
                    svgId="notification"
                    style={{margin: '0 auto'}}
                  />
                </IconNotificationWrapper>
              }>

              {/* Nofification Panel */}
              <NotificationPanel>
                <NotificationTitle className="flex-shrink-0">Nofications</NotificationTitle>
                <FsxTab className="flex">
                  <FsxTabItem title="Standard" className="flex flex-col">
                  <NotificationContent className={`${items.length == 0 ? 'no-content' : ''}`}>
                        {
                        items && sortByDates(items).slice(0, 5).map((notif, index) => (
                                <NotificationContentItem key={index} onClick={() => pushToLink(notif)}>
                                  <NotificationStandardImage>
                                    <CellItemImageTemplate {...notif.createdByUser} />
                                  </NotificationStandardImage>
                                  <NotificationStandardDesciption>
                                    <div><span>{(notif.createdByUser.username === user?.username) ? 'You' : `${notif.createdByUser.firstName} ${notif.createdByUser.lastName}`}</span> {notif.transactionType.name.toLowerCase()} <span>{notif.transactionGroup?.name}</span> with a ref. no. <span>{notif.referenceNo}</span></div>
                                  </NotificationStandardDesciption>
                                  <NotificationStandardTime>
                                    {`${momentUtil.utcStartOf(notif.dateCreated, "seconds")}`}
                                  </NotificationStandardTime>
                                </NotificationContentItem>  
                        ))
                        }

                        { items.length == 0 && <div className="pb-12"><img src={ImageResources.NoNotificationFound} height={150} width={150} /><BlockSpan>No notifications found</BlockSpan></div> }
                   </NotificationContent>
                    <NotificationContentFooter>{ items.length > 0 && <ViewAllLink>View All</ViewAllLink>}</NotificationContentFooter>
                  </FsxTabItem>
                  
                  <FsxTabItem title="For Approvals">
                      {
                      forApprovals.map((forApproval, index) => (
                        <ForApprovalListItem key={index} className={forApproval.count > 0 ? 'has-count' : ''} onClick={() => {
                          if (forApproval.count == 0) return;
                            
                          setIsOpen(true); setSelectedForApproval(forApproval.transactionType);
                          btnDropdownRef.current?.close();
                          hubConn && hubConn.invoke("GetForApprovalNotificationPerModule", forApproval.transactionType)
                        }}>
                          <ModuleLabel>{forApproval.transactionType}</ModuleLabel>
                          <BadgeCount label={forApproval.count.toString()} rounded />
                        </ForApprovalListItem>
                      ))
                      }
                  </FsxTabItem>
                </FsxTab>
              </NotificationPanel>
            </ButtonDropdown>
          </NavItem>
          <NavItem>
            <ButtonDropdown
              label={user && user.username}
              transparent
              ripple
              rounded
              dropPosition="bottom-right">
              <ButtonDropdownItem onClick={() => history.push('/app/setting/user/profile')}>
                View Profile
              </ButtonDropdownItem>
              <ButtonDropdownItem onClick={() => history.push('/app/setting/user/changepassword')}>
                Change Password
              </ButtonDropdownItem>
              {user && (user.isAdmin || user.isSuperAdmin) && (
                <ButtonDropdownItem onClick={() => history.push('/app/setting/user/management')}>
                  User Management
                </ButtonDropdownItem>
              )}
              {user && (user.isAdmin || user.isSuperAdmin) && (
                <>
                  <ButtonDropdownItem onClick={() => history.push(`/admin/general/project/1`)}>
                    General Settings
                  </ButtonDropdownItem>
                  <ButtonDropdownItem onClick={() => history.push('/app/setting/user/session')}>
                    Login Sessions
                  </ButtonDropdownItem>
                </>
              )}
              <ButtonDropdownItem>Help</ButtonDropdownItem>
              <ButtonDropdownItem>About</ButtonDropdownItem>
            </ButtonDropdown>
          </NavItem>
          <NavItem>
            <Button transparent ripple circle onClick={() => logout()}>
              <SvgIcon size={14} color="#ffffff" svgId="signout" style={{margin: '0 auto'}} />
            </Button>
          </NavItem>
        </Nav>
      </div>
      </NavBar>
      <FsxDrawer
          className={'lg:!w-2/5'}
          title={`For Approvals - ${selectedForApproval}`}
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}>
          <div className="flex flex-1 flex-col w-full py-4 px-8">
                <FsxTable scrollable="scrollable" className="flex-grow" data={_.flatMap(forApprovalByModule, "notificationApprovals")} columns={columns} onRowDoubleClick={handleGridDblClick} />
          </div>
        </FsxDrawer>
      </>
  );
};

export default React.memo(Header);
