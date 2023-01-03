import React from 'react';
import {FsxGrid, Loader} from '../../../components/common';
import {GridColumn, GridProps} from '@progress/kendo-react-grid';
import {useUser} from '../../../queries';
import KGridMenuFilter from '../../../plugins/KGridMenuFilter';

const UserGrid: React.FC<{} & GridProps> = props => {
  const {users, isLoading} = useUser();

  const cellItemImageTemplate = (props: any) => {
    const {userImage, firstName, lastName} = props.dataItem;
    return (
      <td><img className="h-5 rounded-full" src={userImage ? `data:${userImage.fileType};base64,${userImage.file}` :`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`} /></td>
    );
  };

  const cellItemStatusTemplate = (props: any) => {
    const {status} = props.dataItem;
    return (
    <td><span className={`m-auto rounded-full px-2 py-1 text-xs uppercase text-white ${status.title.toLowerCase() === "active" ? 'bg-green-500' : 'bg-red-500'}`}>{status.title}</span></td>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
       <FsxGrid data={users} className="h-full" {...props}>
          {/* <GridColumn field="id" title="User Id" filter={'numeric'} columnMenu={KGridMenuFilter} /> */}
          <GridColumn
            width={'50px'}
            cell ={cellItemImageTemplate}
          />
             <GridColumn
            field="username"
            title="User Name"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="firstName"
            title="First Name"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="lastName"
            title="Last Name"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="email"
            title="Email Address"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="designation.title"
            title="Position/ Title"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="department.title"
            title="Department"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
         <GridColumn
            field="country.title"
            title="Country"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            title="Status"
            cell={cellItemStatusTemplate}
          />
        </FsxGrid>
      )}
    </>
  );
};

export default UserGrid;
