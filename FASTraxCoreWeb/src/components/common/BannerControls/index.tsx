import React from 'react';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {RootState} from '../../../store/rootReducer';
import {changeProjectSite} from '../../../store/catalog/projects/actions';
import {setPagesCurrent} from '@app/store/settings/pages/types';
import {setPagePermissionActions} from '@app/store/settings/actions/action.reducer';
import {pullPages, pullActions} from '@app/services/settings/pages.service';
import {useHistory} from 'react-router-dom';
import {setProjectSiteHeaderAuth} from '@app/services/http.service';

const BannerControlsWrapperStyled = styled.div`
  display: flex;
  background: #4e4e4e;
`;

const BannerControlsStyled = styled.div`
  display: flex;
  background: ${props => props.theme.content.bgColor};
  border-top-left-radius: 25px;
  padding: 8px 15px;
  flex-direction: column;
  min-width: 280px;
`;

export interface BannerControlsProps {}

const BannerControls: React.FC<BannerControlsProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const project = useSelector((state: RootState) => state.projects.current);
  const user = useSelector((state: RootState) => state.users.current);
  const selectedProjectSite = useSelector(
    (state: RootState) => state.projectSiteReducer.selected,
    shallowEqual,
  );

  const selected = React.useMemo(() => selectedProjectSite || project?.selectedProjectSite, [
    project,
    selectedProjectSite,
  ]);

  React.useEffect(() => {
    return () => {
      // dispatch(setPagesCurrent([]));
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  React.useEffect(() => {
    checkProjectSite();
  }, [project, selectedProjectSite, selected]);

  const checkSelected = React.useCallback(() => {
    if (!selected) return;
    setProjectSiteHeaderAuth(selected.id);
    history.push('/app/dashboard');
    window.location.reload();
  }, [selected]);

  const checkProjectSite = React.useCallback(() => {

    if (!project) return;
    if (!project.userProjectSitesRole) return;
    if (!project.selectedProjectSite) return;
    if (!user) return;

    const userProjectSiteRoles = project.userProjectSitesRole.filter(
      site => site.projectSiteId === project.selectedProjectSite?.id,
    );

    const userProjectSiteRole = userProjectSiteRoles && userProjectSiteRoles[0];
    


    pullPages(
      userProjectSiteRole.projectRoleId,
      user.id,
      project.selectedProjectSite?.id,
    ).then(response => dispatch(setPagesCurrent(response)));

    pullActions(
      userProjectSiteRole.projectRoleId,
      user.id,
      project.selectedProjectSite?.id,
    ).then(response => dispatch(setPagePermissionActions(response)));
  }, [project, selected]);

  return (
    <BannerControlsWrapperStyled id="banner_control">
      <BannerControlsStyled>
        <div className="flex flex-row items-center mb-2">
          <div className="w-col w-1/3">Group</div>
          <div className="w-col w-2/3">
            <label>{project?.group?.title}</label>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="w-col w-1/3">Location</div>
          <div className="w-col w-2/3">
            {project && (
              <DropDownList
                style={{width: '100%'}}
                data={project.projectSites}
                value={selected}
                disabled={project.projectSites && project.projectSites.length <= 1}
                textField="title"
                onChange={e => {
                  dispatch(changeProjectSite(e.target.value['id']));
                  checkSelected();
                }}
              />
            )}
          </div>
        </div>
      </BannerControlsStyled>
    </BannerControlsWrapperStyled>
  );
};

export default React.memo(BannerControls);
