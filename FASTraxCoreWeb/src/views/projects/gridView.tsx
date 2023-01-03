import React from 'react';
import {GridColumn} from '@progress/kendo-react-grid';
import {AvatarGroup, ButtonDropdown, ButtonDropdownItem, FsxGrid, SvgIcon, TransitionWrapper} from '@app/components/common';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import {Project} from '@app/entities/catalog';
import NoImageAvailable from '@app/assets/images/no-image-available.jpg';
import {UserProject} from '@app/entities/catalog/UserProject';
import {useHistory} from 'react-router-dom';

export interface ProjectGridViewProps {
  data: Project[];
  onClick: (project: Project) => void;
}

const ProjectGridView: React.FC<ProjectGridViewProps> = ({data, onClick, ...rest}) => {
  const history = useHistory();
  const cellItemImageTemplate = (props: any) => {
    const {projectImage} = props.dataItem;
    return (
      <td>
        <img className="h-6 rounded" src={projectImage ? `data:${projectImage.fileType};base64,${projectImage.file}` : NoImageAvailable} />
      </td>
    );
  };

  const cellItemImageUsersTemplate = (props: any) => {
    const {userProjects} = props.dataItem;
    return (
      <td>
        {userProjects && (
          <AvatarGroup
            hoverField={user => `${user.firstName} ${user.lastName}`}
            data={userProjects
              .filter((up: UserProject) => up.user?.active)
              .map((up: UserProject) => ({
                ...up.user,
                image:
                  up.user && up.user.userImage
                    ? `data:${up.user.userImage.fileType};base64,${up.user.userImage.file}`
                    : up.user && `https://avatars.dicebear.com/api/initials/${up.user.firstName} ${up.user.lastName}.svg`,
              }))}
          />
        )}
      </td>
    );
  };

  const cellItemActionTemplate = (props: any) => {
    const {id} = props.dataItem;
    return (
      <td className="flex justify-center p-0">
        <ButtonDropdown icon={<SvgIcon size={14} color="#333" svgId="cog" style={{margin: '0 auto'}} />} transparent ripple circle dropPosition="bottom-left">
          <ButtonDropdownItem onClick={() => history.push(`/app/setting/project/${id}`)}>Edit Project</ButtonDropdownItem>
          <ButtonDropdownItem>Remove Project</ButtonDropdownItem>
        </ButtonDropdown>
      </td>
    );
  };

  return (
    <TransitionWrapper className="flex flex-col mt-8 flex-grow">
      <FsxGrid data={data} className="h-full mb-5" onRowDoubleClick={e => onClick(e.dataItem)}>
        <GridColumn width={'50px'} cell={cellItemImageTemplate} />
        <GridColumn field="title" title="Project" filter={'text'} columnMenu={KGridMenuFilter} />
        <GridColumn field="country.title" title="Country" filter={'text'} columnMenu={KGridMenuFilter} />
        <GridColumn field="client.name" title="Company" filter={'text'} columnMenu={KGridMenuFilter} />
        <GridColumn field="client.websiteUrl" title="Website Url" filter={'text'} columnMenu={KGridMenuFilter} />
        <GridColumn field="client.contactNo" title="Contact No." filter={'text'} columnMenu={KGridMenuFilter} />
        <GridColumn width={'150px'} title="Project Users" filter={'text'} cell={cellItemImageUsersTemplate} />
        <GridColumn width={'50px'} title="" filter={'text'} cell={cellItemActionTemplate} />
      </FsxGrid>
    </TransitionWrapper>
  );
};

export default ProjectGridView;
