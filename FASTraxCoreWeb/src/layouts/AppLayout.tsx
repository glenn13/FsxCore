import React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import Layout from '../components/layout';
import Navigation from '../components/layout/Navigation';
import {Routes as routeList, getDynamicRoutes} from '../routes';
import {ReactComponent as FastraxSvg} from '../assets/images/fastrax-logo.svg';
import {RootState} from '@app/store/rootReducer';
import {removeSelectedProject} from '@app/services/auth.service';
import {
  Brand,
  Aside,
  SidebarExtension,
  Content,
  Banner,
  Breadcrumb,
  BreadcrumbItem,
  SvgIcon,
} from '../components/common';
import ButtonDropdown from '@app/components/common/ButtonDropdown';
import ButtonDropdownItem from '@app/components/common/ButtonDropdown/ButtonDropdownItem';
import useRoute from '@app/hooks/useRoute';
import ProjectsRoute from '../routes/projects';
import {useAppStore} from '../providers/app.store';
import {checkLoggedUser} from '../store/catalog/users/actions';
import {checkCurrentProject} from '../store/catalog/projects/actions';
import {useWindowSize} from '@app/hooks/useWindowSize';
import clx from 'classnames';
import {setProject} from '@app/store/catalog/projects/reducers';

interface AppProps {}

const AppLayout: React.FunctionComponent<AppProps> = props => {
  const windowSize = useWindowSize();
  const isDefaultPage = window.location.pathname !== '/app/projects';
  const projects = useSelector((state: RootState) => state.projects.all, shallowEqual);
  const user = useSelector((state: RootState) => state.users.current, shallowEqual);
  const history = useHistory();
  const {
    hasProjectSelected,
    toggleSidebar,
    setMobile,
    mobile,
    setTablet,
    setDesktop,
    sidebarOpen,
    tablet,
    desktop,
    setHasProjectSelected,
  } = useAppStore();
  const {
    breadcrumbItems,
    currentPage,
    siblingPage,
    hasParent,
    backClick,
    clickLink,
    position,
  } = useRoute();

  const reduxDispatch = useDispatch();
  React.useEffect(() => {
    reduxDispatch(checkLoggedUser());
    reduxDispatch(checkCurrentProject());
  }, [reduxDispatch]);

  React.useEffect(() => {
    if (windowSize.width >= 320 && windowSize.width <= 600) setMobile(true);
    else if (windowSize.width > 600 && windowSize.width <= 970) setTablet(true);
    else setDesktop(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.width, windowSize.height]);

  const clearSelectedProject = () => {
    removeSelectedProject();
    reduxDispatch(setProject({} as any));
    setHasProjectSelected();
    history.push('/app/projects');
  };

  return (
    <Layout>
      {currentPage && currentPage.meta && !!currentPage.meta.layoutPart?.banner && (
        <Banner
          title={currentPage?.meta?.title || ''}
          subTitle={currentPage?.meta?.description || ''}
        />
      )}

      {currentPage &&
        currentPage.meta &&
        !!currentPage.meta.layoutPart?.aside &&
        hasProjectSelected && (
          <Aside
            className={clx(``, {
              'sidebar-mobile-hide': (mobile || tablet) && !sidebarOpen,
              'sidebar-mobile-show': (mobile || tablet) && sidebarOpen,
              'sidebar-desktop-hide': desktop && !sidebarOpen,
              'sidebar-desktop-show': desktop && sidebarOpen,
            })}>
            <Brand>
              <FastraxSvg
                onClick={e => history.push('/app/projects')}
              />
            </Brand>
            <Navigation
              position={position}
              childPages={siblingPage}
              hasParent={hasParent}
              onBackClick={backClick}
              navigateLink={clickLink}
            />
            <SidebarExtension>
              <ul>
                <li>
                  <span onClick={() => toggleSidebar()}>
                    <i className="ams-toggle-list"></i>
                  </span>
                </li>
                <li>
                  <ButtonDropdown
                    icon={
                      <SvgIcon size={14} color="#ffffff" svgId="cog" style={{margin: '0 auto'}} />
                    }
                    transparent
                    ripple
                    circle
                    dropPosition="top-left">
                    <ButtonDropdownItem onClick={e => history.push('/app/setting/standardentries')}>
                      Standard Entries
                    </ButtonDropdownItem>
                    <ButtonDropdownItem>Activity Log</ButtonDropdownItem>
                  </ButtonDropdown>
                </li>
              </ul>
            </SidebarExtension>
          </Aside>
        )}
      <Content boxed={currentPage?.meta?.container?.boxed} className={!isDefaultPage ? '' : 'p-5'}>
        <div className="flex flex-col h-full">
          {isDefaultPage && (
            <Breadcrumb>
              {breadcrumbItems &&
                breadcrumbItems.map((value, key) => (
                  <BreadcrumbItem key={key}>{value.meta?.title}</BreadcrumbItem>
                ))}
            </Breadcrumb>
          )}

          <div className="flex-grow">
            <Switch>
              {getDynamicRoutes(routeList, '/app', hasProjectSelected, '/app/projects')}
              <Route path="/app/projects" component={ProjectsRoute} />
              <Redirect from="*" to="/app/dashboard" />
            </Switch>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default React.memo(AppLayout);
