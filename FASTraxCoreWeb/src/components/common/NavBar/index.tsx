import React, {HTMLAttributes} from 'react';
import invert from 'invert-color';
import styled from 'styled-components';
import {useAppStore} from '@app/providers/app.store';
import useRoute from '@app/hooks/useRoute';
import {SvgIcon} from '@app/components/common';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from '@app/store/rootReducer';
import {ReactComponent as FastraxSvg} from '@app/assets/images/fastrax-logo.svg';
import {useHistory} from 'react-router-dom';

interface IProps {}

const IconWrap = styled.div`
  svg {
    height: 30px;
  }

  svg path:not(#squares),
  svg polygon {
    fill: #fff !important;
  }
`;

const NavBarStyled = styled.div<IProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  flex-shrink: 0;
  height: 50px;
  padding: 0 15px;
  background: #4e4e4e;
  align-items: center;

  ul.inline-list {
    display: block;
  }
  ul.inline-list li {
    display: inline-block;
  }
  ul.inline-list li span {
    display: block;
    padding: 11px 15px;
    color: ${props => invert(props.theme.color.primary)};

    :hover {
      cursor: pointer;
    }
  }
  ul.inline-list li span > i {
    color: #ffffff;
    vertical-align: middle;
    color: #ffffff;
  }

  .header-nav-title {
    padding: 4px 45px;
    background: #5b5b5b;
    border-radius: 30px;
  }
`;

export const Index: React.FC<IProps & HTMLAttributes<HTMLDivElement>> = props => {
  const {toggleSidebar, sidebarOpen, hasProjectSelected} = useAppStore();
  const history = useHistory();
  const {currentPage} = useRoute();
  const project = useSelector((state: RootState) => state.projects.current, shallowEqual);
  return (
    <NavBarStyled {...props} id="navbar">
      <div className="flex-grow">
        <div className="flex flex-row">
          {!sidebarOpen && (
            <SvgIcon
              size={14}
              color="#ffffff"
              svgId="toggle-list"
              className="cursor-pointer"
              style={{marginTop: '5px', marginLeft: '12px'}}
              onClick={() => toggleSidebar()}
            />
          )}
          {(!!!currentPage?.meta?.layoutPart?.aside || !hasProjectSelected) && (
            <IconWrap>
              <FastraxSvg onClick={() => history.push('/app/projects')} />
            </IconWrap>
          )}
          <div className="flex flex-row lg:justify-center flex-grow">
            {project && project.title && (
              <span className="header-nav-title text-white text-center">{project.title}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex-shrink">
        <div className="flex">{props.children}</div>
      </div>
    </NavBarStyled>
  );
};

export default React.memo(Index);
