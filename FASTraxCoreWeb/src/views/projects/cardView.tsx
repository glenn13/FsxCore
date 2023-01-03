import React from 'react';
import {Project} from '@app/entities/catalog';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {AvatarGroup, ButtonDropdown, ButtonDropdownItem, SvgIcon} from '@app/components/common';
import NoImageAvailable from '@app/assets/images/no-image-available.jpg';
import moment from 'moment';
import {useHistory} from 'react-router-dom';

const ProjectItem = motion.custom(styled.div`
  position: relative;
  padding: 15px 20px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  box-shadow: 0px 3px 13px -5px var(--shadow-color);
  background: #fff;
  position: relative;
  transition: background 0.3s ease-in, box-shadow 0.1s ease-in;
  user-select: none;

  .title {
    font-size: 1.2em;
    color: #4c4b4b;
    font-weight: 500 !important;
  }

  .title > .code {
    color: #a7a7a7;
    font-weight: 300;
  }

  .company-name {
    color: #4c4b4b;
    font-weight: 400;
  }

  ul.user-avatars {
    padding-top: 10px;
    display: flex;
  }

  ul.user-avatars li img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  ul.user-avatars li + li {
    margin-left: -15px;
  }

  &:hover {
    background-color: #343434;
    cursor: pointer;
    box-shadow: 0px 14px 25px -2px var(--shadow-color);

    .title,
    .company-name {
      color: #ffffff;
    }

    .project-setting svg {
      fill: #fff;
    }

    .project-image-wrapper {
      border: 2px solid #ffffff;
    }
  }

  ul li {
    font-weight: 300;
    font-size: 12px;
    font-family: 'Roboto';
    color: #888888;
  }

  .project-setting {
    position: absolute;
    right: 15px;
    top: 33px;
  }

  &:before {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    top: 60px;
    left: 0;
  }
`);

const ProjectContentBody = motion.custom(styled.div`
  padding-top: 10px;
  display: grid;
  grid-gap: 2em;
  text-align: center;
  margin-top: 10px;
  position: relative;

  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1600px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-gap: 1em;
  }
`);

const ProjectItemImageWrapper = styled.div`
  position: absolute;
  top: 20px;
  border: 2px solid transparent;
  border-radius: 12%;
  background: #fff#fff;
`;

const ProjectItemImage = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 12%;
`;

const ProjectItemDateCreated = styled.span`
  font-size: 0.8em;
  color: #a7a7a7;
  font-weight: 300;
`;

export interface ProjectGridViewProps {
  data: Project[];
  onClick: (project: Project) => void;
}

const ProjectCardView: React.FC<ProjectGridViewProps> = ({data, onClick, ...rest}) => {
  const history = useHistory();
  const getProjectImage = (projectImage: any) => {
    if (!projectImage) return NoImageAvailable;

    return `data:${projectImage.fileType};base64,${projectImage.file}`;
  };

  const contentVariants = {
    hidden: {opacity: 0, y: 10},
    visible: {opacity: 1, y: 0, transition: {staggerChildren: 0.2, delayChildren: 0.2}},
  };

  const itemVariants = {
    hidden: {y: 10, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <ProjectContentBody
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      transition={{delay: 0.4}}>
      {data
        .filter(d => d.active)
        .map(up => {
          return (
            <ProjectItem key={up.id} variants={itemVariants}>
              <div className="project-setting">
                <ButtonDropdown
                  icon={<SvgIcon size={14} color="#333" svgId="cog" style={{margin: '0 auto'}} />}
                  transparent
                  ripple
                  circle
                  dropPosition="bottom-left">
                  <ButtonDropdownItem onClick={() => history.push(`/app/setting/project/${up.id}`)}>
                    Edit Project
                  </ButtonDropdownItem>
                  <ButtonDropdownItem>Remove Project</ButtonDropdownItem>
                </ButtonDropdown>
              </div>

              <div className="w-full mt-12 mb-3" onClick={() => onClick(up)}>
                <div className="project-item-top mt-16">
                  <ProjectItemImageWrapper className="project-image-wrapper mb-6">
                    <ProjectItemImage src={getProjectImage(up.projectImage)} />
                  </ProjectItemImageWrapper>
                </div>

                <div className="title">
                  {up.title} - <span className="code">{up.code}</span>
                </div>

                <ul className="pb-3">
                  <li className="company-name">{up.client?.name}</li>
                  <li>{up?.client?.websiteUrl}</li>
                </ul>

                <div className="flex flex-row">
                  <div className="flex-grow">
                    {up.userProjects && (
                      <AvatarGroup
                        hoverField={user => `${user.firstName} ${user.lastName}`}
                        data={up.userProjects
                          .filter(up => up.user?.active)
                          .map(up => ({
                            ...up.user,
                            image:
                              up.user && up.user.userImage
                                ? `data:${up.user.userImage.fileType};base64,${up.user.userImage.file}`
                                : up.user &&
                                  `https://avatars.dicebear.com/api/initials/${up.user.firstName} ${up.user.lastName}.svg`,
                          }))}
                      />
                    )}
                  </div>
                  <div className="flex-shrink">
                    <ProjectItemDateCreated>{`${moment(up.dateCreated)
                      .startOf('seconds')
                      .fromNow()}`}</ProjectItemDateCreated>
                  </div>
                </div>
              </div>
            </ProjectItem>
          );
        })}
    </ProjectContentBody>
  );
};

export default ProjectCardView;
