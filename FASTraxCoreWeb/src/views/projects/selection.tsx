import {Block} from '../../components/common';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import React from 'react';
import {RootState} from '../../store/rootReducer';
import authService from '../../services/auth.service';
import styled from 'styled-components';
import {updateCurrentProject} from '../../store/catalog/projects/actions';
import {useAppStore} from '../../providers/app.store';
import {Redirect, useHistory} from 'react-router-dom';
import {useProjectsByUser} from '@app/services/catalog/project.service';
import {setProjects} from '../../store/catalog/projects/reducers';
import {ImageResources} from '@app/assets';

const color = require('color');

const ProjectBlockWrapper = styled.div`
  width: calc(100vw - 20%);
  height: calc(100vh - 20%);
  position: relative;
  padding: 20px 10px;
  margin-top: 50px;
  background: none;
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
    margin: -20px;
    overflow: hidden;
  }
`;

const CardBoxWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardBox = styled.div`
  --cardbox-bg: #303340;
  height: 40%;
  max-height: 385px;
  width: 80%;
  max-width: 385px;
  position: relative;
  padding: 15px 20px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  box-shadow: 0px 3px 13px -5px var(--shadow-color);
  background: var(--cardbox-bg);
  position: relative;
  transition: background 0.3s ease-in, box-shadow 0.1s ease-in;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-35px) scale(1);
  transition: transform 0.2s ease-in;

  &:hover {
    cursor: pointer;
    transform: translateY(-25px) scale(1.03);

    span:first-child,
    span:last-child {
      opacity: 0;
    }
  }

  //   box-shadow: 0px 14px 0 -9px #30334073;

  span:first-child,
  span:last-child {
    transition: opacity 0.15s ease-in-out;
  }

  span:first-child {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgb(48 51 64 / 40%);
    border-radius: 18px;
    transform: scale(0.8, 0.8) translateY(16%);
    opacity: 1;
  }

  span:nth-child(2) {
    background: var(--cardbox-bg);
    color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-radius: 18px;
    font-size: 1.2em;
    z-index: 5;
    opacity: 1;
  }

  span:last-child {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgb(48 51 64 / 13%);
    border-radius: 18px;
    transform: scale(0.66, 0.8) translateY(18%);
  }
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

    if (Object.keys(userProjects).length == 1) dispatch(updateCurrentProject(userProjects[0].id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProjects]);

  React.useEffect(() => {
    if (!project) return;
    if (project.selectedProjectSite) setHasProjectSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const handleClick = (projectId: number) => {
    dispatch(updateCurrentProject(projectId));
    authService.currentProject.observe().subscribe(e => {
      setHasProjectSelected();
      history.push('/app/dashboard');
    });
  };

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
          <div className="flex flex-row h-full relative">
            <CardBoxWrapper>
              <CardBox onClick={() => window.open('https://fastrax.ams.global', '_blank')}>
                <span></span>
                <span>
                  <img src={ImageResources.Tracking} style={{height: 100, marginBottom: 20}} />
                  Tracking and Telematics
                </span>
                <span></span>
              </CardBox>
            </CardBoxWrapper>
            <CardBoxWrapper>
              <CardBox onClick={() => handleClick(1)}>
                <span></span>
                <span>
                  <img
                    src={ImageResources.MaintenanceSpareParts}
                    style={{height: 100, marginBottom: 20}}
                  />
                  Maintenance and Spare Parts
                </span>
                <span></span>
              </CardBox>
            </CardBoxWrapper>
          </div>
        </ProjectBlockWrapper>
      </Block>
    </div>
  );
};

export default React.memo(Projects);
