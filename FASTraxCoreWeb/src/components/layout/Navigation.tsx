import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import Theme from '@app/theme/constant';
import {IRoutePageProps} from 'routes';
import {Sidebar, SvgIcon} from '../common';
import {useAppStore} from '@app/providers/app.store';

export interface NavigationProps {
  children?: React.ReactNode | React.ReactNode[];
  position: string;
  childPages: IRoutePageProps[];
  hasParent: boolean;
  onBackClick: () => void;
  navigateLink: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id?: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({children, ...props}) => {
  const {theme} = useAppStore();
  const isCurrentActive = (uri: string) => {
    return window.location.pathname.indexOf(uri) > -1;
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto lg:pt-12">
      <Sidebar>
        <ul className="flex flex-1 flex-col">
          <li className="nav_title">Navigation</li>
          <div className="flex flex-1 flex-col justify-between">
            <div className={`${props.position && 'from__' + props.position}`}>
              {props.childPages
                .filter(p => p.showOnSidebar && p.isEnable)
                .map((page, indx) => (
                  <li key={indx}>
                    <Link
                      to={page.layout + page.uri}
                      onClick={e => {
                        return isCurrentActive(page.layout + page.uri) && !page.hasChild
                          ? e.preventDefault
                          : props.navigateLink(e, page.id);
                      }}
                      className={classNames({
                        active: isCurrentActive(page.layout + page.uri),
                        has_child: page.hasChild,
                      })}>
                      {page.icon ? (
                        <SvgIcon
                          svgPath={true}
                          svgId={page.icon}
                          size={24}
                          color={theme === Theme.LIGHT ? '#5a5151' : '#ffffff'}
                          className="sidebar-icon"
                        />
                      ) : null}
                      <span>{page.meta?.title}</span>
                    </Link>
                  </li>
                ))}
              {children}
            </div>
            {!!props.hasParent && props.childPages.filter(value => value.showOnSidebar).length > 1 && (
              <li className="back_list">
                <button type="button" onClick={e => props.onBackClick()}>
                  <SvgIcon
                    svgId="back"
                    size={22}
                    color={theme === Theme.LIGHT ? '#5a5151' : '#ffffff'}
                  />
                </button>
              </li>
            )}
          </div>
        </ul>
      </Sidebar>
    </div>
  );
};

export default React.memo(Navigation);
