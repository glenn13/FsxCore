import create from 'zustand';
import Theme from '../theme/constant';
import userService from '../services/user.service';
import projectService from '../services/catalog/projects.service';

type StateType = {
  theme: Theme;
  authenticated: boolean;
  hasProjectSelected: boolean;
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  sidebarOpen: boolean;
  routePages: Array<any>;
};

type DispatchType = {
  toggleTheme: () => void;
  setAuthenticated: () => void;
  setHasProjectSelected: () => void;
  toggleSidebar: () => void;
  setMobile: (isMobile: boolean) => void;
  setTablet: (isTablet: boolean) => void;
  setDesktop: (isDesktop: boolean) => void;
  setRoutePages: (routePages: Array<any>) => void;
};

const getCurrentLoggedIn = (): boolean => !!userService.Local.currentUser.get()?.jwtToken;
const getCurrentProject = (): boolean => !!projectService.Session.currentProject.get()?.id;

const initialState: StateType = {
  theme: Theme.LIGHT,
  authenticated: getCurrentLoggedIn(),
  hasProjectSelected: getCurrentProject(),
  mobile: false,
  tablet: false,
  desktop: false,
  sidebarOpen: false,
  routePages: [],
};

type StoreProps = StateType & DispatchType;

export const useAppStore = create<StoreProps>(set => ({
  ...initialState,
  toggleTheme: () => set(state => ({theme: state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK})),
  setAuthenticated: () => set(state => ({authenticated: getCurrentLoggedIn()})),
  setHasProjectSelected: () => set(state => ({hasProjectSelected: getCurrentProject()})),
  toggleSidebar: () => set(state => ({sidebarOpen: !state.sidebarOpen})),
  setMobile: (isMobile: boolean) =>
    set(state => ({mobile: isMobile, tablet: !isMobile, sidebarOpen: false, desktop: false})),
  setTablet: (isTablet: boolean) =>
    set(state => ({tablet: isTablet, mobile: !isTablet, sidebarOpen: false, desktop: false})),
  setDesktop: (isDesktop: boolean) =>
    set(state => ({desktop: isDesktop, mobile: !isDesktop, tablet: !isDesktop, sidebarOpen: true})),
  setRoutePages: (routePages: Array<any>) => set(state => ({routePages: routePages})),
}));
