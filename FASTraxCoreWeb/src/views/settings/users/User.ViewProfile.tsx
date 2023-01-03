import React from 'react';
import styled from 'styled-components';
import {User} from '@app/entities/catalog';

import {attachmentToDataURL} from '@app/helpers/files';
import {ReactComponent as IconSvg} from '@app/assets/images/user_info.svg';
import Badge from '@app/components/common/Badge';
import FsxGridWithSelection from '@app/components/common/FsxGridWithSelection';
import {BaseUUIDType} from '@app/components/common/FsxGridWithSelection';
import {GridColumn} from '@progress/kendo-react-grid';
import {capitalizeString} from '@app/utils/string.util';
import {UserProjectSiteRole} from '@app/entities/catalog/UserProjectSiteRole';
import {SvgIcon} from '@app/components/common';

const ProfileTop = styled.div`
  background-color: #212020 !important;
`;

const ListInfoStyled = styled.ul`
  li.user_fullname {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.034em;
  }

  li.user_designation,
  li > .user_address {
    font-size: 12px;
    font-weight: 300;
    color: #a5a5a5;
    letter-spacing: 0.04em;
  }
`;

const HeaderStyled = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #464646;
`;

const HeaderSubStyled = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #a0a3aa;
`;

const LabelStyled = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #a0a3aa;
`;

const LabelValueStyled = styled.div`
  font-size: 13px;
  color: #4e4e4e;
`;

interface IUserViewProfileProps {
  data: User;
}

const UserViewProfile: React.FC<IUserViewProfileProps> = ({data, ...props}) => {
  const [uri, setUri] = React.useState<string>();
  const [dataGrid, setDataGrid] = React.useState<Array<UserProjectSiteRole & BaseUUIDType>>();

  const handleLoad = async (value: any) => {
    if (!value) return;

    const imageUri = attachmentToDataURL({...value});

    imageUri && setUri(imageUri);
  };

  React.useEffect(() => {
    if (!data) return;

    handleLoad(data.userImage);
    data.userProjectSitesRole && setDataGrid(data.userProjectSitesRole as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <ProfileTop className="shadow-lg p-4 widget-box profile_svg_bg">
        <div className="flex flex-row h-full items-center py-5 px-8">
          <div className="pr-5">
            <img
              className="h-32 w-32 rounded-full"
              src={
                !uri
                  ? `https://avatars.dicebear.com/api/initials/${data.firstName} ${data.lastName}.svg`
                  : uri
              }
            />
          </div>
          <div>
            <ListInfoStyled>
              <li className="user_fullname">{`${data.firstName} ${data.lastName}`}</li>
              <li className="user_designation">{`${capitalizeString(data.designation.title)}`}</li>
              <li className="mt-2">
                <div className="flex flex-row user_address">
                  <SvgIcon
                    size={14}
                    color="#fff"
                    svgId="location-marker"
                    style={{margin: '0 5px 0 auto'}}
                  />
                  {`${data.country.title}`}
                </div>
              </li>
            </ListInfoStyled>
          </div>
        </div>
      </ProfileTop>
      <div className="shadow-lg p-4 bg-white widget-box flex flex-col flex-grow py-8 px-8">
        <div className="mb-8">
          <div className="inline-flex flex-row items-center">
            <div className="pr-5">
              <IconSvg />
            </div>
            <div className="">
              <HeaderStyled>Personal Information</HeaderStyled>
              <HeaderSubStyled>Displays user’s basic information </HeaderSubStyled>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 mb-8">
          <div>
            <LabelStyled>Full Name</LabelStyled>
            <LabelValueStyled>{`${data.firstName} ${data.lastName}`}</LabelValueStyled>
          </div>
          <div>
            <LabelStyled>Username</LabelStyled>
            <LabelValueStyled>{data.username}</LabelValueStyled>
          </div>
          <div>
            <LabelStyled>Status</LabelStyled>
            <div>
              <Badge label="Active" type="success" />
            </div>
          </div>
          <div>
            <LabelStyled>Department</LabelStyled>
            <LabelValueStyled>{data.department?.title}</LabelValueStyled>
          </div>
          <div>
            <LabelStyled>Position</LabelStyled>
            <LabelValueStyled>{data.designation.title}</LabelValueStyled>
          </div>
          <div>
            <LabelStyled>Contact No.</LabelStyled>
            <LabelValueStyled>{data.contactNo}</LabelValueStyled>
          </div>
          <div>
            <LabelStyled>Address</LabelStyled>
            <LabelValueStyled>{`${data.address || ''}`}</LabelValueStyled>
          </div>
          <div>
            <LabelStyled>State/ Zip Code</LabelStyled>
            <LabelValueStyled>{data.stateZipCode}</LabelValueStyled>
          </div>
          <div>
            <LabelStyled>Email Address</LabelStyled>
            <LabelValueStyled>{data.email}</LabelValueStyled>
          </div>
        </div>
        <div className="mb-6">
          <LabelStyled className="mb-2">Projects</LabelStyled>
          {data.userProjects &&
            data.userProjects.map(
              ({project}) =>
                project && <Badge label={project.title} type="info" className="mr-3" />,
            )}
        </div>
        <div className="flex-grow">
          {dataGrid && dataGrid.length > 0 && (
            <FsxGridWithSelection
              data={dataGrid}
              style={{height: 500}}
              options={{group: [{field: 'projectSite.project.title'}]}}
              checkSelection={false}
              pageable={true}>
              <GridColumn title="Project Site" field="projectSite.title" />
              <GridColumn title="Project Role" field="projectRole.title" />
            </FsxGridWithSelection>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(UserViewProfile);
