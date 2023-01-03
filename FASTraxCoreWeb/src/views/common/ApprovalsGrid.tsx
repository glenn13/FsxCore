import React from 'react';
import {useUsers} from '@app/queries';
import GridWithDrawer from './GridWithDrawer';
import {User} from '@app/entities/catalog/User';
import {FsxTable} from '@app/components/common';
import {GridColumn, NumberKeyValuePair} from '@app/helpers/types';
import EntityApproval, {newEntityApproval} from '@app/entities/global/EntityApproval';
import {newApproval} from '@app/entities/global/Approval';

export interface ApprovalsGridProps {
  approvers: User[];
  approvals: EntityApproval[];
  onDelete?: () => void;
  onSubmit?: (user: User) => boolean;
  onSubmitPromise?: (user: User) => Promise<boolean>;
}

const columns: GridColumn[] = [
  {field: 'approval.designatedTo.firstName', title: 'First Name'},
  {field: 'approval.designatedTo.lastName', title: 'Last Name'},
  {field: 'approval.actionDateTime', title: 'Date Approved', format: '{0:dd-MMM-yyyy}'},
  {field: 'approval.remarks', title: 'Remarks'},
];
const userColums: GridColumn[] = [
  {field: 'firstName', title: 'First Name'},
  {field: 'lastName', title: 'Last Name'},
];

const ApprovalsGrid: React.FC<ApprovalsGridProps> = ({
  approvers,
  approvals,
  onDelete,
  onSubmitPromise,
}) => {
  const users = useUsers();
  const [, setSelected] = React.useState(0);
  const [data, setData] = React.useState<EntityApproval[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User>();

  const filteredUsers = React.useMemo(() => {
    if (!users.data) return [];

    const existingApproverIds: number[] = data.map(d => d.approval.designatedToId);

    return users.data.data.filter(u => existingApproverIds.indexOf(u.id) === -1);
  }, [users, data]);

  React.useEffect(() => {
    const userIds: NumberKeyValuePair<boolean> = {};
    const result = [...approvals];
    for (const entity of approvals)
      if (entity.approval) userIds[entity.approval.designatedToId] = true;

    const existingIds = result.map(data => data.id);
    for (const approver of approvers)
      if (!userIds[approver.id]) result.push(newEntityApproval(newApproval(approver), existingIds));

    setData(result);
  }, [approvers, approvals]);

  const handleSubmitPromise = React.useCallback(async () => {
    if (!onSubmitPromise || !selectedUser) return false;

    return await onSubmitPromise(selectedUser);
  }, [selectedUser, onSubmitPromise]);

  return (
    <div className="flex flex-1">
      <GridWithDrawer
        data={data}
        columns={columns}
        onDelete={onDelete}
        onSubmitPromise={handleSubmitPromise}
        drawerTitle="Disposition Approvers"
        onSelect={value => setSelected(value)}>
        <FsxTable
          dataKey="id"
          columns={userColums}
          data={filteredUsers}
          onRowClick={e => setSelectedUser(e.dataItem)}
        />
      </GridWithDrawer>
    </div>
  );
};

export default React.memo(ApprovalsGrid);
