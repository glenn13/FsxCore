import React, {useState, useEffect} from 'react';
import {Page} from '../store/settings/pages/types';
import {Routes, IRoutePageProps, RoutesStatic} from '../routes';
import {matchPath} from 'react-router-dom';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from '@app/store/rootReducer';

import _ from 'lodash';

const nameKeys = ['.add', '.edit'];

export function useRoute() {
  const [pagesRoute, setpagesRoute] = useState<IRoutePageProps[] | null>(null);
  const [currentPage, setCurrentPage] = useState<IRoutePageProps | null>(null);
  const [breadcrumbItems, setBreadcrumbItems] = useState<Array<IRoutePageProps>>([]);
  const [siblingPage, setSiblingPage] = useState<Array<IRoutePageProps>>([]);
  const [hasParent, sethasParent] = useState<boolean>(false);
  const [position, setPosition] = useState<string>('');
  const [currentId, setcurrentId] = useState<number>();
  const path = window.location.pathname;
  const pages = useSelector((state: RootState) => state.pagesReducer.current, shallowEqual);

  const backClick = () => {
    // get previously clicked link id
    // then filter route pages with that id
    const parent = pagesRoute && pagesRoute.filter(e => e.id === currentId);

    // if parent with no parentId or meaning no parent
    // then get siblings
    if ((parent || []).length > 0) {
      setSiblingPage(!!pagesRoute ? pagesRoute?.filter(e => !e.parentId) : []);
      sethasParent(false);
    } else {
      setSiblingPage(
        !!pagesRoute ? pagesRoute?.filter(e => parent && e.parentId === parent[0].parentId) : [],
      );
      sethasParent(true);
    }

    setPosition('left');
  };

  const clickLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id?: number) => {
    setcurrentId(id);
    const child =
      pagesRoute &&
      pagesRoute.filter(
        p =>
          p.parentId === id &&
          p.parentId === id &&
          p.showOnSidebar &&
          !nameKeys.some(n => p.name.includes(n)),
      );

    // checks has children based on clicked id
    // if true navigate siblings Page
    // else continue redirect
    if (child && child.length > 0) {
      e.preventDefault();

      setSiblingPage(child);
      sethasParent(true);

      setPosition('right');
    }
  };

  const findPagesByURL = (
    lists: IRoutePageProps[],
    id?: number,
    currentPages: IRoutePageProps[] = [],
  ) => {
    _.each(lists, (value: IRoutePageProps) => {
      if (value.id === id) {
        currentPages.unshift(value);
        if (!!value?.parentId) {
          const getParent = lists.find((page: IRoutePageProps) => page.id === value.parentId);
          const parentId = getParent?.id;
          findPagesByURL(lists, parentId, currentPages);
        }
      }
    });
    return currentPages;
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const findItemsWithName = (list: IRoutePageProps[], pathName: string) => {
      const currentRoute = list.find(route => {
        return matchPath(path.replace(route.layout, ''), {
          path: route.uri,
          exact: true,
        });
      });

      return currentRoute || ({} as IRoutePageProps);
    };

    const findByKeyNameOnList = (list: Page[], name: string) => {
      const pageFiltered = list.filter(e => e.name.toLowerCase() === name.toLowerCase());
      return pageFiltered && pageFiltered[0];
    };

    const getPages = async () => {
      if (!pages) return;
      

      // pull list pages from service
      const pageList = pages; 

      const routePages = _.concat(Routes, RoutesStatic)
        .filter(e => e.layout !== '/')
        .map(e => {
          const {isEnable, id, parentId, hideOnSidebar} = findByKeyNameOnList(pageList, e.name) || {
            isEnable: e.isEnable,
            id: e.id || Math.random() * 10000,
            parentId: e.parentId,
            hideOnSidebar: !e.showOnSidebar || true,
          };

          /// checks if found any child based on id
          const childFound = pageList.findIndex(
            (p: any) =>
              p.parentId &&
              p.parentId === id &&
              !p.hideOnSidebar &&
              !nameKeys.some(n => p.name.includes(n)),
          );

          return {
            ...e,
            isEnable,
            id,
            parentId,
            hasChild: childFound > -1,
            showOnSidebar: !hideOnSidebar,
          };
        });

      setpagesRoute(routePages);

      let currentPageObj = {} as IRoutePageProps;
      let parentId: number | undefined;
      let currentId: number | undefined;

      const index: number = path.match(/(\/:id|\/\d+|\/new)/)?.index || -1;
      if (index > -1) {
        const currentPageObj = findItemsWithName(routePages, path);

        if (!currentPageObj) return;

        setCurrentPage(currentPageObj);

        const cleanUri = path.substring(0, index);
        const parentMenuPage = routePages.filter(e => {
          return cleanUri.includes(`${e.layout}${e.uri}`);
        });

        currentId = currentPageObj.id;
        parentId = parentMenuPage[parentMenuPage.length - 1].parentId;
        sethasParent(!!parentId);
        setcurrentId(currentId);
      } else {
        currentPageObj = findItemsWithName(routePages, path);

        if (!currentPageObj) return;

        setCurrentPage(currentPageObj);

        currentId = currentPageObj.id || 0;
        parentId = currentPageObj.parentId;
        currentPageObj.showOnSidebar && sethasParent(!!parentId);
        setcurrentId(currentId);
      }

      // get values of Page in list by Url for Breadcrumb
      // then set to breadcrumbitem
      const items = currentPageObj && findPagesByURL(routePages, currentId);
      const currentSiblings = routePages.filter(e => e.parentId === parentId);

      setSiblingPage(currentSiblings);
      setBreadcrumbItems(items);
    };
    getPages();
  }, [path, pages]);

  return React.useMemo(() => {
    return {breadcrumbItems, currentPage, siblingPage, hasParent, backClick, clickLink, position};
  }, [breadcrumbItems, currentPage, siblingPage, hasParent, position]);
}

export default useRoute;
