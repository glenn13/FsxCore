import {Block, SvgIcon, Button, ButtonGroup, Tooltip} from '../../components/common';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import React from 'react';
import {RootState} from '../../store/rootReducer';
import authService from '../../services/auth.service';
import styled from 'styled-components';
import {updateCurrentProject} from '../../store/catalog/projects/actions';
import {useAppStore} from '../../providers/app.store';
import {Redirect, useHistory} from 'react-router-dom';
import {Project} from '@app/entities/catalog';
import {useProjectsByUser} from '@app/services/catalog/project.service';
import {setProjects} from '../../store/catalog/projects/reducers';
import ProjectGridView from './gridView';
import ProjectCardView from './cardView';

const color = require('color');

const ProjectBlockWrapper = styled.div`
  width: calc(100vw - 20%);
  height: calc(100vh - 20%);
  position: relative;
  padding: 20px 10px;
  margin-top: 50px;
  //   background: rgba(255, 255, 255, 0.5);
  background: ${props => color(props.theme.panel.bgColor).fade(0.5)};
  overflow: hidden;

  @media (min-width: 1280px) {
    margin-top: 60px;
    padding: 20px 40px;
  }

  &:before {
    content: '';
    position: absolute;
    background: inherit;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px ${props => color(props.theme.panel.bgColor).fade(0.5)};
    // box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
    // -webkit-filter: blur(10px);
    // filter: blur(40px);
    margin: -20px;
    overflow: hidden;
  }
`;

const Badge = styled.span`
  padding: 3px 8px;
  background: #f0f3f5;
  border-radius: 50%;
  margin-left: 8px;
  height: 25px;
`;

const ProjectSubHeader = styled.small`
  color: #7d8c9b;
  font-size: 0.92em;
  font-weight: 300;
`;

type IProjectsProps = {};

export const Projects: React.FC<IProjectsProps> = props => {
  const [gridView, setGridView] = React.useState(false);
  const {setHasProjectSelected, hasProjectSelected} = useAppStore();
  const history = useHistory();
  const {user, project, projects} = useSelector(
    (state: RootState) => ({
      user: state.users.current,
      project: state.projects.current,
      projects: state.projects.all,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  const {data, isLoading} = useProjectsByUser(user?.id || 0);
  const userProjects = React.useMemo(() => data, [data]);

  React.useEffect(() => {
    if (!userProjects) return;

    dispatch(setProjects(userProjects));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProjects]);

  React.useEffect(() => {
    if (!project) return;
    if (project.selectedProjectSite) setHasProjectSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const handleClick = (project: Project) => {
    if (!project.id) return console.error('UserProjects is missing its property Project!');
    if (!project.projectSites || project.projectSites?.length === 0)
      return alert('You are not yet tagged to any Project Site at the moment.');

    if (!project.projectRoles || project.projectRoles?.length === 0)
      return alert('You are not yet tagged to any Project Roles at the moment.');

    dispatch(updateCurrentProject(project.id));
    authService.currentProject.observe().subscribe(e => {
      setHasProjectSelected();
      history.push('/app/dashboard');
    });
  };

  if (hasProjectSelected) return <Redirect to="/app/dashboard" />;

  const handleToggleView = () => setGridView(!gridView);

  return (
    <div className="flex h-full blob_background">
      <Block
        flex
        wrapFlex
        grow
        center
        middle
        style={{
          height: '100%',
        }}>
        <ProjectBlockWrapper className="widget-box flex flex-col px-10 sm:px-10">
          <div className="flex flex-row flex-wrap lg:flex-wrap">
            <div className="flex-grow">
              <h1 className="text-4xl flex items-center content-center relative">
                Projects <Badge>{projects.filter(d => d.active).length}</Badge>
              </h1>
              <ProjectSubHeader>Lists of accessible project</ProjectSubHeader>
            </div>
            <div className="flex-grow sm:flex-grow-0 lg:flex-shrink">
              <div className="flex flex-row items-center">
                <div>
                  {user && user.isSuperAdmin && (
                    <Button
                      rounded
                      ripple
                      className="mt-3"
                      onClick={() => history.push('/app/setting/project/new')}>
                      Create Project
                      <SvgIcon size={14} color="#fff" svgId="add" style={{marginLeft: 4}} />
                    </Button>
                  )}
                </div>
                <div className="ml-5 flex flex-grow justify-end">
                  <ButtonGroup className="mt-3">
                    <Button
                      transparent
                      ripple
                      className="px-2"
                      data-tooltip-for="viewThumb"
                      data-tooltip-message="View Card"
                      disabled={!gridView}
                      onClick={handleToggleView}>
                      <SvgIcon
                        size={22}
                        color="#4f5761"
                        svgId="thumbnail"
                        style={{margin: '0 auto'}}
                      />
                    </Button>
                    <Button
                      transparent
                      ripple
                      className="px-2"
                      data-tooltip-for="viewList"
                      data-tooltip-message="View List"
                      disabled={gridView}
                      onClick={handleToggleView}>
                      <SvgIcon size={22} color="#4f5761" svgId="list" style={{margin: '0 auto'}} />
                    </Button>
                  </ButtonGroup>
                  <Tooltip id="viewThumb" position="bottom" />
                  <Tooltip id="viewList" position="bottom" />
                </div>
              </div>
            </div>
          </div>
          {!isLoading && data && gridView && <ProjectGridView data={data} onClick={handleClick} />}
          {!isLoading && data && !gridView && <ProjectCardView data={data} onClick={handleClick} />}
        </ProjectBlockWrapper>
      </Block>
    </div>
  );
};

export default React.memo(Projects);
