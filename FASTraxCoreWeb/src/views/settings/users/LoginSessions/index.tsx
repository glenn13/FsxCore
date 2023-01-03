import React from 'react';
import styled from 'styled-components';
import {FsxGrid} from '@app/components/common';
import {useUserSessions} from '@app/services/catalog/user.session';
import {GridColumn} from '@progress/kendo-react-grid';
import moment from 'moment';

interface IUserViewProfileProps {}

const LoginSessions: React.FC<IUserViewProfileProps> = ({...props}) => {
  const {userSessions, isLoading} = useUserSessions();

  const cellItemDateTemplate = (props: any, field: string) => {
    return (
      <td>
        {props.dataItem[field] && moment(props.dataItem[field]).format('DD-MMM-yyyy hh:mm:ss a')}
      </td>
    );
  };

  return (
    <>
      {!isLoading && (
        <FsxGrid data={userSessions} className="h-full" {...props}>
          <GridColumn title="Refresh Token" field="id" />
          <GridColumn title="Date Created" cell={props => cellItemDateTemplate(props, 'created')} />
          <GridColumn title="Date Expiry" cell={props => cellItemDateTemplate(props, 'expires')} />
          <GridColumn title="Origin" field="origin" />
          <GridColumn title="IP Address" field="createdByIp" />
          <GridColumn title="User" field="username" />
          <GridColumn title="Browser" field="session.browser" />
        </FsxGrid>
      )}
    </>
  );
};

export default React.memo(LoginSessions);
